#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { parse as parseHtml } from 'parse5';
import * as cssTree from 'css-tree';
import { parseSrcset } from 'srcset';
import { parse as parseJs } from 'acorn';
import { SaxesParser } from 'saxes';
import ts from 'typescript';

export const limitations = [
  'Static regression evidence only; this does not prove tracking is absent or establish legal compliance.',
  'Next bundles are classified by exact byte equality with the local .next/static build, not by runtime behavior. That build and its dependencies remain trusted inputs.',
  'Literal Next Flight bootstrap/data calls are classified by syntax; their serialized data and framework execution are not semantically audited.',
  'Browser network/storage observation, hosting/account settings, geographic variants and service-worker history require separate review.',
];
const cssKeyword = value => value ? cssTree.ident.decode(value).toLowerCase() : '';
const result = () => ({findings: [], resources: [], framework: []});
const merge = (target, source) => { for (const key of ['findings', 'resources', 'framework']) target[key].push(...source[key]); };
// Reports retain origin/path only. Full URLs belong solely to parsing/request state.
export function reportUrl(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? `${url.origin}${url.pathname}` : '[unsupported URL]';
  } catch { return '[invalid URL]'; }
}
export function addFinding(report, code, detail, location = {}) {
  const finding = {code, detail, ...location};
  if (finding.url !== undefined) finding.url = reportUrl(finding.url);
  report.findings.push(finding);
}
const add = addFinding;
export const digest = text => createHash('sha256').update(text).digest('hex');

function resource(report, value, url, kind, onResource) {
  try {
    const target = new URL(value, url);
    if (target.protocol === 'data:' && kind === 'image') return;
    if (!['http:', 'https:'].includes(target.protocol)) {
      add(report, 'unsupported-resource', `${kind}: unsupported resource protocol`, {url});
      return;
    }
    report.resources.push({url: reportUrl(target.href), kind, from: reportUrl(url)});
    if (target.username || target.password) add(report, 'credential-resource', 'Resource URL contains credentials and will not be requested', {url});
    else onResource?.({fullURL: target.href, kind});
    if (target.origin !== new URL(url).origin) add(report, 'external-resource', `${kind}: ${target.origin}`, {url});
  } catch { add(report, 'invalid-resource', `${kind}: invalid URL`, {url}); }
}

function nextFlight(script) {
  const member = (node, property) => node?.type === 'MemberExpression' && !node.computed && !node.optional && node.property.name === property;
  const flight = node => member(node, '__next_f') && node.object.type === 'Identifier' && node.object.name === 'self';
  try {
    const body = parseJs(script, {ecmaVersion: 'latest'}).body;
    if (body.length !== 1 || body[0].type !== 'ExpressionStatement') return false;
    const call = body[0].expression;
    if (call.type !== 'CallExpression' || call.optional || !member(call.callee, 'push') || call.arguments.length !== 1) return false;
    const array = call.arguments[0];
    if (array.type !== 'ArrayExpression' || !array.elements.every(node => node?.type === 'Literal' && !node.regex && !node.bigint)) return false;
    const values = array.elements.map(node => node.value);
    const receiver = call.callee.object;
    if (flight(receiver)) return values.length === 2 && [1, 3].includes(values[0]) && typeof values[1] === 'string';
    return receiver.type === 'AssignmentExpression' && receiver.operator === '=' && flight(receiver.left)
      && receiver.right.type === 'LogicalExpression' && receiver.right.operator === '||' && flight(receiver.right.left)
      && receiver.right.right.type === 'ArrayExpression' && receiver.right.right.elements.length === 0
      && values.length === 1 && values[0] === 0;
  } catch { return false; }
}

export function auditCss({css, url, context = 'stylesheet', onResource}) {
  const report = result();
  try {
    const ast = cssTree.parse(css, {context, parseCustomProperty: true});
    cssTree.walk(ast, function(node) {
      if (node.type === 'Url') resource(report, node.value, url, cssKeyword(this.atrule?.name) === 'import' ? 'stylesheet' : 'image', onResource);
      if (node.type === 'String' && (cssKeyword(this.atrule?.name) === 'import' || ['image-set', '-webkit-image-set'].includes(cssKeyword(this.function?.name)))) {
        resource(report, node.value, url, cssKeyword(this.atrule?.name) === 'import' ? 'stylesheet' : 'image', onResource);
      }
      // Resource-bearing values must parse. Unrecognized supports/media conditions and selectors do not load resources.
      if (node.type === 'Raw' && (this.declaration || cssKeyword(this.atrule?.name) === 'import')) add(report, 'unparsed-css', 'CSS declaration could not be fully parsed', {url});
    });
  } catch { add(report, 'unparsed-css', 'CSS could not be fully parsed', {url}); }
  return report;
}

export function auditHtml({html, url, frameworkAssets = new Map(), onResource}) {
  const report = result();
  const document = parseHtml(html);
  const visit = node => {
    const name = node.tagName;
    const attrs = Object.fromEntries((node.attrs ?? []).map(attr => [attr.prefix ? `${attr.prefix}:${attr.name}` : attr.name, attr.value]));
    const body = (node.childNodes ?? []).filter(child => child.nodeName === '#text').map(child => child.value).join('');
    if (name === 'base') add(report, 'unsupported-base', 'Base URL overrides require review', {url});
    for (const [key, value] of Object.entries(attrs)) {
      if (key.startsWith('on')) add(report, 'authored-script', 'Inline event handler', {url});
      if (['href', 'xlink:href', 'action', 'formaction'].includes(key)) {
        try { if (new URL(value, url).protocol === 'javascript:') add(report, 'authored-script', 'Executable navigation URL', {url}); } catch { /* Resource checks handle invalid URLs. */ }
      }
    }
    if ('ping' in attrs) add(report, 'tracking-ping', 'Anchor ping is outside the no-tracking baseline', {url});
    if ('attributionsrc' in attrs) add(report, 'tracking-attribution', 'Attribution reporting requires review', {url});
    if (['iframe', 'object', 'embed'].includes(name)) add(report, 'unsupported-active-content', `${name} requires an accepted integration`, {url});
    if (name === 'form') {
      // The accepted calculator has no native data submission. Its client source
      // is separately hash-reviewed; other forms still require integration review.
      const safeControls = element => !(element.attrs ?? []).some(attr => ['name', 'action', 'method', 'target', 'enctype', 'formaction', 'formmethod', 'formtarget', 'formenctype'].includes(attr.name))
        && (element.childNodes ?? []).every(safeControls);
      const calculator = ['/kite-size-guide/', '/kite-size-guide/index.html'].includes(new URL(url).pathname)
        && attrs['aria-labelledby'] === 'trip-heading' && !('id' in attrs) && safeControls(node);
      if (!calculator) add(report, 'unsupported-active-content', 'form requires an accepted integration', {url});
    }
    if (name === 'meta' && ['refresh', 'set-cookie'].includes(attrs['http-equiv']?.toLowerCase())) add(report, 'unsupported-http-equiv', 'Meta response behavior requires review', {url});
    if (name === 'script') {
      if (attrs.src !== undefined) {
        resource(report, attrs.src, url, 'script', onResource);
        let target;
        try { target = new URL(attrs.src, url); } catch { /* Already reported. */ }
        if (target?.origin === new URL(url).origin && frameworkAssets.has(target.pathname) && !target.search && !target.username && !target.password) {
          report.framework.push({url: reportUrl(target.href), classification: 'build-matched-bundle'});
        } else add(report, 'authored-script', 'Unclassified executable script resource', {url});
      } else if (attrs.type?.trim().toLowerCase() === 'application/ld+json') {
        try { JSON.parse(body); } catch { add(report, 'invalid-json-ld', 'Invalid structured data', {url}); }
      } else if (nextFlight(body)) report.framework.push({url: reportUrl(url), classification: 'literal-next-flight'});
      else add(report, 'authored-script', 'Unclassified inline script', {url});
    } else {
      if ('src' in attrs) resource(report, attrs.src, url, ['img', 'input', 'source'].includes(name) ? 'image' : 'resource', onResource);
      if ('poster' in attrs) resource(report, attrs.poster, url, 'image', onResource);
      if (name === 'object' && attrs.data) resource(report, attrs.data, url, 'object', onResource);
      if (['image', 'use', 'feImage'].includes(name) && (attrs.href || attrs['xlink:href'])) resource(report, attrs.href || attrs['xlink:href'], url, 'image', onResource);
      if (['body', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th'].includes(name) && 'background' in attrs) resource(report, attrs.background, url, 'image', onResource);
    }
    for (const key of ['srcset', 'imagesrcset']) if (key in attrs) {
      try {
        const candidates = parseSrcset(attrs[key], {strict: true});
        if (!candidates.length) throw new Error('No candidates');
        for (const candidate of candidates) resource(report, candidate.url, url, 'image', onResource);
      } catch { add(report, 'invalid-srcset', 'Responsive candidates could not be fully parsed', {url}); }
    }
    if (name === 'link') {
      const rels = (attrs.rel ?? '').toLowerCase().split(/\s+/);
      if (rels.some(rel => ['stylesheet', 'preload', 'modulepreload', 'prefetch', 'preconnect', 'dns-prefetch', 'icon', 'manifest', 'apple-touch-icon'].includes(rel)) && attrs.href) {
        resource(report, attrs.href, url, rels.includes('stylesheet') ? 'stylesheet' : attrs.as === 'script' || rels.includes('modulepreload') ? 'script' : 'link', onResource);
      }
    }
    if (name === 'style') merge(report, auditCss({css: body, url, onResource}));
    if (attrs.style) merge(report, auditCss({css: attrs.style, url, context:'declarationList', onResource}));
    for (const child of node.childNodes ?? []) visit(child);
    if (node.content) visit(node.content);
  };
  visit(document);
  return report;
}

export function sitemapRoutes(xml, origin) {
  const parser = new SaxesParser({xmlns: true});
  const stack = [];
  const routes = [];
  let value = '';
  const ns = 'http://www.sitemaps.org/schemas/sitemap/0.9';
  parser.on('doctype', () => { throw new Error('Sitemap DTD is unsupported'); });
  parser.on('opentag', tag => {
    stack.push(tag.local);
    if (tag.uri !== ns || (stack.length === 1 && tag.local !== 'urlset')) throw new Error('Expected a sitemap urlset');
    if (stack.join('/') === 'urlset/url/loc') value = '';
  });
  parser.on('text', text => { if (stack.join('/') === 'urlset/url/loc') value += text; });
  parser.on('cdata', text => { if (stack.join('/') === 'urlset/url/loc') value += text; });
  parser.on('closetag', () => {
    if (stack.join('/') === 'urlset/url/loc') {
      const url = new URL(value.trim());
      if (url.origin !== origin || url.search || url.hash || url.username || url.password) throw new Error('Sitemap URL is outside the canonical origin');
      routes.push(url.pathname);
    }
    stack.pop();
  });
  parser.write(xml).close();
  if (!routes.length || new Set(routes).size !== routes.length) throw new Error('Sitemap has no routes or duplicates');
  return routes;
}

async function files(directory, optional = false) {
  try {
    const entries = await readdir(directory, {withFileTypes: true});
    const paths = [];
    for (const entry of entries) {
      if (entry.isSymbolicLink()) throw new Error(`Symlink requires review: ${directory}/${entry.name}`);
      if (entry.isDirectory()) paths.push(...await files(path.join(directory, entry.name)));
      else paths.push(path.join(directory, entry.name));
    }
    return paths;
  } catch (error) { if (optional && error.code === 'ENOENT') return []; throw error; }
}

// Read typed site constants with the installed TypeScript parser; do not execute application code.
export async function readSiteContract(root) {
  const source = ts.createSourceFile('site.ts', await readFile(path.join(root, 'content/site.ts'), 'utf8'), ts.ScriptTarget.Latest, true);
  const unwrap = expression => ts.isAsExpression(expression) || ts.isSatisfiesExpression(expression) ? unwrap(expression.expression) : expression;
  const contract = {};
  const declarations = new Map();
  for (const statement of source.statements) if (ts.isVariableStatement(statement)) for (const declaration of statement.declarationList.declarations) {
    const name = declaration.name.getText(source);
    const initializer = declaration.initializer && unwrap(declaration.initializer);
    declarations.set(name, initializer);
    if (name === 'siteConfig' && initializer && ts.isObjectLiteralExpression(initializer)) {
      const origin = initializer.properties.find(property => property.name?.getText(source) === 'origin');
      if (origin && ts.isPropertyAssignment(origin) && ts.isStringLiteral(origin.initializer)) contract.origin = origin.initializer.text;
    }
  }
  const literalRoutes = (name, seen = new Set()) => {
    if (seen.has(name)) throw new Error('Circular route declaration');
    const nextSeen = new Set([...seen, name]);
    const initializer = declarations.get(name);
    if (!initializer || !ts.isArrayLiteralExpression(initializer)) throw new Error('Routes must be literal arrays');
    return initializer.elements.flatMap(element => {
      if (ts.isStringLiteral(element)) return [element.text];
      if (ts.isSpreadElement(element) && ts.isIdentifier(element.expression)) return literalRoutes(element.expression.text, nextSeen);
      throw new Error('Routes must be literal strings or literal array spreads');
    });
  };
  contract.expectedRoutes = literalRoutes('publicRoutes');
  const noindexRoutes = declarations.has('noindexRoutes') ? literalRoutes('noindexRoutes') : [];
  if (noindexRoutes.some(route => !contract.expectedRoutes.includes(route))) throw new Error('Unknown noindex route');
  contract.expectedIndexableRoutes = contract.expectedRoutes.filter(route => !noindexRoutes.includes(route));
  if (!contract.origin || !contract.expectedRoutes?.length) throw new Error('Missing typed site origin/routes');
  return contract;
}

export async function auditExport({root = process.cwd(), origin, expectedRoutes, expectedIndexableRoutes} = {}) {
  const report = {...result(), frameworkAssets: new Map(), routes: [], limitations};
  if (!origin || !expectedRoutes) ({origin, expectedRoutes, expectedIndexableRoutes} = await readSiteContract(root));
  expectedIndexableRoutes ??= expectedRoutes;
  const out = path.join(root, 'out');
  let exported;
  try { exported = await files(out); } catch { add(report, 'missing-export', 'Export is missing or unreadable'); return report; }
  const allFiles = [...exported, ...await files(path.join(root, 'public'), true)];
  for (const file of allFiles) if (/\.(?:m?js|cjs)$/i.test(file)) {
    const relative = path.relative(out, file).split(path.sep).join('/');
    if (relative.startsWith('_next/static/') && !path.relative(out, file).startsWith('..')) {
      try {
        const bytes = await readFile(file);
        const build = await readFile(path.join(root, '.next/static', relative.slice('_next/static/'.length)));
        if (!bytes.equals(build)) throw new Error('Build bytes differ');
        report.frameworkAssets.set(`/${relative}`, digest(bytes));
        report.framework.push({file, classification:'build-matched-bundle', sha256: digest(bytes)});
      } catch { add(report, 'unverified-framework', 'Exported bundle does not match local build', {file}); }
    } else add(report, 'authored-script', 'Authored public/exported executable file requires review', {file});
  }
  let reviewedBoundaries = {};
  try { reviewedBoundaries = JSON.parse(await readFile(path.join(root, 'scripts/reviewed-client-boundaries.json'), 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  for (const directory of ['app', 'components', 'content', 'lib']) for (const file of await files(path.join(root, directory), true)) if (/\.[cm]?[jt]sx?$/.test(file)) {
    const bytes = await readFile(file);
    const source = ts.createSourceFile(file, bytes.toString('utf8'), ts.ScriptTarget.Latest, true);
    for (const statement of source.statements) {
      if (!ts.isExpressionStatement(statement) || !ts.isStringLiteral(statement.expression)) break;
      if (statement.expression.text === 'use client') {
        const entry = reviewedBoundaries[path.relative(root, file).split(path.sep).join('/')];
        if (!entry?.review || entry.sha256 !== digest(bytes)) add(report, 'authored-client-runtime', 'New or changed client boundary requires a reviewed runtime integration', {file});
        else report.framework.push({file, classification:'reviewed-client-boundary', sha256:entry.sha256});
      }
    }
  }
  for (const file of allFiles) if (/\.(?:html|css|svg)$/i.test(file)) {
    const relative = path.relative(file.startsWith(`${out}${path.sep}`) ? out : path.join(root, 'public'), file).split(path.sep).join('/');
    const url = new URL(`/${relative}`, origin).href;
    const text = await readFile(file, 'utf8');
    const inspected = file.endsWith('.css') ? auditCss({css: text, url}) : auditHtml({html: text, url, frameworkAssets: report.frameworkAssets});
    for (const finding of inspected.findings) finding.file = file;
    merge(report, inspected);
  }
  for (const route of expectedRoutes) {
    if (!route.startsWith('/') || route.includes('..') || route.includes('?') || route.includes('#') || route.startsWith('//') || !route.endsWith('/')) { add(report, 'route-coverage', 'Invalid expected route'); continue; }
    const file = path.join(out, route, 'index.html');
    if (!exported.includes(file)) add(report, 'route-coverage', 'Missing expected route export', {url:new URL(route, origin).href});
    else report.routes.push(route);
  }
  try {
    const routes = sitemapRoutes(await readFile(path.join(out, 'sitemap.xml'), 'utf8'), origin);
    if (routes.length !== expectedIndexableRoutes.length || routes.some(route => !expectedIndexableRoutes.includes(route))) throw new Error('Sitemap and typed indexable routes differ');
  } catch { add(report, 'sitemap-coverage', 'Sitemap is unreadable, invalid or differs from expected routes'); }
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const report = await auditExport();
    console.log(JSON.stringify({...report, frameworkAssets: Object.fromEntries(report.frameworkAssets)}, null, 2));
    if (report.findings.length) process.exitCode = 1;
  } catch { console.error('Privacy audit could not complete; check the site contract and local build.'); process.exitCode = 1; }
}
