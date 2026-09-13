#!/usr/bin/env node
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { auditHtml, auditCss, auditExport, auditHeaders, addFinding, reportUrl, digest, limitations, readSiteContract, sitemapRoutes } from './privacy-audit.mjs';

// Only normalized media-type categories enter reports, never arbitrary header text.
function responseType(response) {
  const type = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
  return ['text/html', 'text/css', 'text/javascript', 'application/javascript', 'application/xml', 'text/xml', 'application/json', 'application/manifest+json', 'image/svg+xml', 'image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif', 'image/x-icon', 'font/woff', 'font/woff2'].includes(type) ? type : 'other';
}

/** Audit only the supplied host; unexpected cross-origin redirects are reported, never followed. */
export async function auditDeployment({origin, expectedRoutes, expectedIndexableRoutes = expectedRoutes, canonicalOrigin = origin, frameworkAssets = new Map()}) {
  const target = new URL(origin);
  if (!['https:', 'http:'].includes(target.protocol) || target.pathname !== '/' || target.search || target.hash || target.username || target.password) throw new Error('Provide an HTTP(S) origin without path, query or credentials');
  origin = target.origin;
  const report = {findings: [], resources: [], framework: [], responses: [], routes: [], limitations};
  const add = (code, detail, url) => addFinding(report, code, detail, {url});
  if (!expectedRoutes?.length || new Set(expectedRoutes).size !== expectedRoutes.length || expectedRoutes.some(route => !route.startsWith('/') || !route.endsWith('/') || route.includes('..') || route.includes('?') || route.includes('#') || new URL(route, origin).origin !== origin)) {
    add('route-coverage', 'A nonempty trusted expected route list is required', origin);
    return report;
  }
  const request = async initial => {
    let url = initial;
    const seen = new Set();
    for (let hop = 0; hop <= 10; hop++) {
      if (seen.has(url)) throw new Error('Redirect loop');
      seen.add(url);
      const response = await fetch(url, {redirect:'manual', signal:AbortSignal.timeout(15000), headers:{'user-agent':'Hangin static privacy regression audit/1.0'}});
      // Do not record cookie values or potentially identifying response-header values.
      report.responses.push({url:reportUrl(url), status:response.status, contentType:responseType(response), hasSetCookie:response.headers.has('set-cookie')});
      if (response.headers.has('set-cookie')) add('set-cookie', 'Response sets a cookie; owner classification is required', url);
      if (response.headers.has('link')) add('unreviewed-link-header', 'HTTP Link resources require manual review', url);
      if (response.headers.has('refresh')) add('unreviewed-refresh-header', 'HTTP Refresh requires manual review', url);
      report.findings.push(...auditHeaders({headers: response.headers, url}).findings);
      if ([301,302,303,307,308].includes(response.status)) {
        await response.body?.cancel();
        const location = response.headers.get('location');
        if (!location) throw new Error('Redirect has no Location');
        const next = new URL(location, url);
        if (next.origin !== origin || next.username || next.password) {
          add('external-redirect', 'Redirect leaves the audited origin', url);
          return null;
        }
        url = next.href;
        continue;
      }
      if (!response.ok) { await response.body?.cancel(); throw new Error(`HTTP ${response.status}`); }
      return {url, bytes: Buffer.from(await response.arrayBuffer()), type:responseType(response)};
    }
    throw new Error('Too many redirects');
  };
  const queue = [];
  const inspected = new Set();
  // Full URLs stay inside this closure; report entries use the shared URL sanitizer.
  const onResource = entry => { if (new URL(entry.fullURL).origin === origin) queue.push(entry); };
  const merge = partial => {
    for (const key of ['findings', 'resources', 'framework']) report[key].push(...partial[key]);
  };
  try {
    const sitemap = await request(`${origin}/sitemap.xml`);
    if (!sitemap) throw new Error('Sitemap redirected away');
    const discovered = sitemapRoutes(sitemap.bytes.toString('utf8'), canonicalOrigin);
    if (discovered.length !== expectedIndexableRoutes.length || discovered.some(route => !expectedIndexableRoutes.includes(route))) throw new Error('Remote sitemap differs from trusted indexable routes');
  } catch { add('sitemap-coverage', 'Sitemap request or coverage validation failed', `${origin}/sitemap.xml`); }
  // Even a broken remote sitemap must not hide a known route from inspection.
  for (const route of expectedRoutes) {
    const url = new URL(route, origin).href;
    try {
      const page = await request(url);
      if (!page) continue;
      if (new URL(page.url).pathname !== route) add('route-coverage', 'Expected route redirects to a different path', url);
      if (page.type !== 'text/html') { add('route-coverage', 'Expected HTML response', url); continue; }
      report.routes.push(route);
      inspected.add(page.url);
      merge(auditHtml({html:page.bytes.toString('utf8'), url:page.url, frameworkAssets, onResource}));
    } catch { add('route-coverage', 'Expected route request or inspection failed', url); }
  }
  while (queue.length) {
    const entry = queue.shift();
    if (inspected.has(entry.fullURL)) continue;
    if (inspected.size >= 1000) { add('resource-coverage', 'Resource limit reached; audit is incomplete', entry.fullURL); break; }
    inspected.add(entry.fullURL);
    try {
      const asset = await request(entry.fullURL);
      if (!asset) continue;
      const pathname = new URL(asset.url).pathname;
      if (entry.kind === 'script' || /\.[cm]?js$/i.test(pathname)) {
        if (!frameworkAssets.has(pathname) || frameworkAssets.get(pathname) !== digest(asset.bytes)) add('unverified-framework', 'Deployed executable bytes do not match the audited local build', asset.url);
      } else if (entry.kind === 'stylesheet' || asset.type === 'text/css' || pathname.endsWith('.css')) {
        if (asset.type !== 'text/css') add('resource-coverage', 'Stylesheet lacks CSS Content-Type', asset.url);
        merge(auditCss({css:asset.bytes.toString('utf8'), url:asset.url, onResource}));
      } else if (['text/html', 'image/svg+xml'].includes(asset.type)) {
        merge(auditHtml({html:asset.bytes.toString('utf8'), url:asset.url, frameworkAssets, onResource}));
      }
    } catch { add('resource-coverage', 'Resource request or inspection failed', entry.fullURL); }
  }
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    if (!process.argv[2]) throw new Error('Usage: npm run audit:privacy:deployed -- https://host.example');
    const local = await auditExport();
    if (local.findings.length) {
      console.error(JSON.stringify({findings:local.findings, message:'Local export must pass before deployment comparison'}, null, 2));
      process.exitCode = 1;
    } else {
      const contract = await readSiteContract(process.cwd());
      const report = await auditDeployment({origin:process.argv[2], canonicalOrigin:contract.origin, expectedRoutes:contract.expectedRoutes, expectedIndexableRoutes:contract.expectedIndexableRoutes, frameworkAssets:local.frameworkAssets});
      console.log(JSON.stringify(report, null, 2));
      if (report.findings.length) process.exitCode = 1;
    }
  } catch { console.error('Deployment audit could not complete; provide an HTTP(S) origin and a verified local build.'); process.exitCode = 1; }
}
