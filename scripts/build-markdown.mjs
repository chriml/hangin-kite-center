#!/usr/bin/env node
// Writes a Markdown twin next to every exported page (out/<route>/index.md).
// functions/_middleware.js serves these files when a request prefers
// text/markdown. The Markdown is derived from the exported HTML so it can only
// repeat content that is already visible on the page.
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from 'parse5';

// Never rendered: scripts, decoration and interactive controls that only work
// with the browser UI. The site header is outside <main> and is not rendered.
const skippedTags = new Set([
  'head', 'script', 'style', 'noscript', 'template', 'svg', 'canvas',
  'form', 'button', 'input', 'select', 'textarea', 'label', 'dialog', 'source', 'track',
  // Embedded provider widgets; each page also has an ordinary provider link.
  'iframe',
]);
const blockTags = new Set([
  'address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl', 'fieldset', 'figcaption',
  'figure', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'li', 'main', 'nav',
  'ol', 'p', 'pre', 'section', 'summary', 'table', 'ul', 'video',
]);
// Pages that exist only as error documents.
const excludedRouteDirs = new Set(['404', '_not-found']);

const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
const elements = node => (node.childNodes ?? []).filter(child => child.tagName);
const find = (node, predicate) => {
  if (predicate(node)) return node;
  for (const child of node.childNodes ?? []) {
    const found = find(child, predicate);
    if (found) return found;
  }
  return undefined;
};
const isHidden = node => attr(node, 'hidden') !== undefined || attr(node, 'aria-hidden') === 'true';
const collapse = text => text.replace(/\s+/g, ' ');
const escapeText = text => text.replace(/([\\`*_[\]<>])/g, '\\$1');
const escapeLinkText = text => text.replace(/([\\[\]])/g, '\\$1');

function absolute(href, base) {
  if (!href) return undefined;
  try {
    const url = new URL(href, base);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? url.href : undefined;
  } catch { return undefined; }
}
const linkTarget = url => /[\s()<>]/.test(url) ? `<${url.replace(/>/g, '%3E')}>` : url;

function renderInline(node, ctx) {
  if (node.nodeName === '#text') return escapeText(collapse(node.value));
  if (!node.tagName || skippedTags.has(node.tagName) || isHidden(node)) return '';
  const inner = () => joinInline(node.childNodes ?? [], ctx);
  switch (node.tagName) {
    case 'br': return '  \n';
    case 'img': {
      const alt = attr(node, 'alt')?.trim();
      const src = absolute(attr(node, 'src'), ctx.base);
      return alt && src ? `![${escapeLinkText(collapse(alt))}](${linkTarget(src)})` : '';
    }
    case 'a': {
      const text = inner().trim() || escapeText(collapse(attr(node, 'aria-label') ?? ''));
      const href = absolute(attr(node, 'href'), ctx.base);
      if (!text) return '';
      if (!href) return text;
      return `[${text}](${linkTarget(href)})`;
    }
    case 'strong': case 'b': { const text = inner().trim(); return text ? `**${text}**` : ''; }
    case 'em': case 'i': { const text = inner().trim(); return text ? `*${text}*` : ''; }
    case 'code': { const text = (node.childNodes ?? []).map(textContent).join(''); return text ? `\`${text.replace(/`/g, '\\`')}\`` : ''; }
    default:
      // A block nested in inline context (for example a card inside a link)
      // is flattened to keep the link usable.
      return blockTags.has(node.tagName) ? ` ${inner()} ` : inner();
  }
}

// Adjacent elements such as nav links or footer spans have no whitespace
// between them in the HTML; keep them readable as separate items.
function joinInline(children, ctx) {
  let text = '';
  let previousElement = false;
  for (const child of children) {
    const part = renderInline(child, ctx);
    if (!part) continue;
    const isElement = Boolean(child.tagName) && child.tagName !== 'br';
    if (previousElement && isElement && !/\s$/.test(text) && !/^\s/.test(part)) text += ' · ';
    text += part;
    previousElement = isElement;
  }
  return text;
}

function textContent(node) {
  if (node.nodeName === '#text') return node.value;
  if (!node.tagName || skippedTags.has(node.tagName)) return '';
  return (node.childNodes ?? []).map(textContent).join('');
}

const tidy = text => text.replace(/[ \t]+\n/g, match => match.endsWith('  \n') ? '  \n' : '\n').replace(/ {2,}(?!\n)/g, ' ').trim();
const indent = (text, prefix) => text.split('\n').map(line => line ? prefix + line : line).join('\n');

// Renders children of a container. Runs of inline content become paragraphs.
function renderChildren(node, ctx) {
  const blocks = [];
  let run = [];
  const flush = () => { const text = tidy(joinInline(run, ctx)); if (text) blocks.push(text); run = []; };
  for (const child of node.childNodes ?? []) {
    if (child.tagName && blockTags.has(child.tagName)) {
      flush();
      const block = renderBlock(child, ctx);
      if (block) blocks.push(block);
    } else run.push(child);
  }
  flush();
  return blocks.join('\n\n');
}

function renderList(node, ctx) {
  const ordered = node.tagName === 'ol';
  let index = Number(attr(node, 'start') ?? 1);
  const items = [];
  for (const item of elements(node)) {
    if (item.tagName !== 'li' || isHidden(item)) continue;
    const body = renderChildren(item, {...ctx, depth: ctx.depth + 1});
    if (!body) continue;
    const marker = ordered ? `${index++}. ` : '- ';
    const [first, ...rest] = body.split('\n');
    items.push(marker + first + (rest.length ? '\n' + indent(rest.join('\n'), ' '.repeat(marker.length)) : ''));
  }
  return items.join('\n');
}

function renderDefinitionList(node, ctx) {
  const items = [];
  const visit = parent => {
    for (const child of elements(parent)) {
      if (isHidden(child)) continue;
      if (child.tagName === 'div') visit(child);
      else if (child.tagName === 'dt') items.push({term: tidy(renderInline(child, ctx)), details: []});
      else if (child.tagName === 'dd') {
        const text = tidy(renderChildren(child, ctx)).replace(/\n+/g, ' ');
        if (!items.length) items.push({term: '', details: []});
        items.at(-1).details.push(text);
      }
    }
  };
  visit(node);
  return items.filter(item => item.term || item.details.length)
    .map(item => `- ${[item.term && `${item.term}:`, item.details.join('; ')].filter(Boolean).join(' ')}`)
    .join('\n');
}

function renderTable(node, ctx) {
  const rows = [];
  const visit = parent => {
    for (const child of elements(parent)) {
      if (child.tagName === 'tr') rows.push(elements(child).filter(cell => ['td', 'th'].includes(cell.tagName))
        .map(cell => tidy(renderChildren(cell, ctx)).replace(/\n+/g, ' ').replace(/\|/g, '\\|')));
      else if (['thead', 'tbody', 'tfoot'].includes(child.tagName)) visit(child);
    }
  };
  visit(node);
  if (!rows.length) return '';
  const width = Math.max(...rows.map(row => row.length));
  const line = row => `| ${Array.from({length: width}, (_, i) => row[i] ?? '').join(' | ')} |`;
  const caption = elements(node).find(child => child.tagName === 'caption');
  const table = [line(rows[0]), line(Array(width).fill('---')), ...rows.slice(1).map(line)].join('\n');
  return caption ? `${tidy(renderInline(caption, ctx))}\n\n${table}` : table;
}

function renderBlock(node, ctx) {
  if (skippedTags.has(node.tagName) || isHidden(node)) return '';
  switch (node.tagName) {
    case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': {
      const text = tidy(renderInline(node, ctx)).replace(/\n+/g, ' ');
      return text ? `${'#'.repeat(Number(node.tagName[1]))} ${text}` : '';
    }
    case 'p': case 'figcaption': return tidy(renderInline(node, ctx));
    case 'summary': { const text = tidy(renderInline(node, ctx)).replace(/\n+/g, ' '); return text ? `**${text}**` : ''; }
    case 'ul': case 'ol': return renderList(node, ctx);
    case 'dl': return renderDefinitionList(node, ctx);
    case 'table': return renderTable(node, ctx);
    case 'hr': return '---';
    case 'pre': return '```\n' + textContent(node).replace(/\n$/, '') + '\n```';
    case 'blockquote': { const body = renderChildren(node, ctx); return body ? indent(body, '> ').replace(/^$/gm, '>') : ''; }
    case 'video': {
      const label = attr(node, 'aria-label')?.trim() ?? attr(node, 'title')?.trim();
      return label ? `Video: ${escapeText(collapse(label))}` : '';
    }
    default: return renderChildren(node, ctx);
  }
}

const yamlString = value => JSON.stringify(value);

export function htmlToMarkdown(html) {
  const document = parse(html);
  const head = find(document, node => node.tagName === 'head');
  const body = find(document, node => node.tagName === 'body');
  const meta = name => head && find(head, node => node.tagName === 'meta' && attr(node, 'name') === name);
  const canonical = head && find(head, node => node.tagName === 'link' && attr(node, 'rel') === 'canonical');
  const titleNode = head && find(head, node => node.tagName === 'title');
  const url = attr(canonical ?? {}, 'href');
  if (!url) throw new Error('Exported page has no canonical URL');
  const ctx = {base: url, depth: 0};

  const frontmatter = [
    '---',
    `title: ${yamlString(collapse(titleNode ? textContent(titleNode) : '').trim())}`,
  ];
  const description = attr(meta('description') ?? {}, 'content');
  if (description) frontmatter.push(`description: ${yamlString(collapse(description).trim())}`);
  frontmatter.push(`url: ${yamlString(url)}`);
  const robots = attr(meta('robots') ?? {}, 'content');
  if (robots) frontmatter.push(`robots: ${yamlString(robots)}`);
  frontmatter.push('---');

  const main = body && find(body, node => node.tagName === 'main');
  const footer = body && find(body, node => node.tagName === 'footer');
  if (!main) throw new Error('Exported page has no <main>');
  const sections = [renderBlock(main, ctx), footer && renderBlock(footer, ctx)].filter(Boolean);
  return `${frontmatter.join('\n')}\n\n${sections.join('\n\n---\n\n').replace(/\n{3,}/g, '\n\n')}\n`;
}

async function pageFiles(directory, root = directory) {
  const found = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (directory === root && (excludedRouteDirs.has(entry.name) || entry.name === '_next')) continue;
      found.push(...await pageFiles(full, root));
    } else if (entry.name === 'index.html') found.push(full);
  }
  return found;
}

export async function buildMarkdown(outDir = path.resolve('out')) {
  const written = [];
  for (const file of await pageFiles(outDir)) {
    const target = path.join(path.dirname(file), 'index.md');
    await writeFile(target, htmlToMarkdown(await readFile(file, 'utf8')));
    written.push(target);
  }
  if (!written.length) throw new Error(`No exported pages found in ${outDir}`);
  return written;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const written = await buildMarkdown(process.argv[2] ? path.resolve(process.argv[2]) : undefined);
  console.log(`Wrote ${written.length} Markdown pages`);
}
