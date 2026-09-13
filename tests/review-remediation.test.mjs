import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { parse } from 'parse5';
import { attribute, jsonLdBlocks, outDir, publicRoutes, readRoute, tags, visibleText } from './export-helpers.mjs';

test('complaint action opens a complaint draft instead of a trip inquiry', async () => {
  const html = await readRoute('/terms/').catch(() => '');
  const complaint = html.match(/<section\b[^>]*id="complaints"[^>]*>[\s\S]*?<\/section>/)?.[0] ?? '';
  const link = tags(complaint, 'a').find(a => attribute(a, 'href')?.startsWith('https://wa.me/'));
  assert.ok(link, 'missing complaint WhatsApp action');
  const url = new URL(attribute(link, 'href').replaceAll('&amp;', '&'));
  assert.equal(url.searchParams.get('text'), "Hi Hangin, I'd like to raise a complaint about a service or item.");
  assert.match(complaint, /mailto:hanginkitecenter@gmail.com\?subject=Complaint/);
});

test('all WhatsApp exits disclose the new tab without removed footer guidance', async () => {
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    assert.doesNotMatch(html, /id="message-guidance"/);
    for (const link of tags(html, 'a').filter(a => attribute(a, 'href')?.startsWith('https://wa.me/'))) {
      assert.match(attribute(link, 'aria-label') ?? '', /opens in a new tab/i, route);
      assert.notEqual(attribute(link, 'aria-describedby'), 'message-guidance');
      assert.equal(attribute(link, 'target'), '_blank');
      assert.equal(attribute(link, 'rel'), 'noopener noreferrer');
    }
    assert.doesNotMatch(visibleText(html), /nothing is sent/i);
  }
});

test('public safety guidance requests intake instructions before health information', async () => {
  for (const route of ['/kitesurfing-lessons/', '/rentals-storage/', '/kite-safaris/']) {
    const html = await readRoute(route);
    const section = html.match(/<section\b[^>]*aria-labelledby="water-safety-title"[^>]*>[\s\S]*?<\/section>/)?.[0] ?? '';
    assert.ok(section, `${route}: safety guidance missing`);
    const text = visibleText(section);
    assert.match(text, /parent or legal guardian/);
    assert.match(text, /before sharing health information/i);
    assert.doesNotMatch(text, /tell us.*(?:health|injury|medication)/i);
  }
});

test('licensed photo captions disclose modifications and footer links to centralized legal information', async () => {
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    const footer = html.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/)?.[0] ?? '';
    assert.ok(tags(footer, 'a').some(link => attribute(link, 'href') === '/legal/'), `${route}: missing central legal information link`);
    assert.doesNotMatch(footer, /Images are owned by|href="\/images\/ATTRIBUTION\.md"/);
    assert.doesNotMatch(html, /href="\/images\/ATTRIBUTION\.md"/, `${route}: public credits belong on the legal page`);
    for (const caption of html.match(/<figcaption\b[^>]*>[\s\S]*?<\/figcaption>/gi) ?? []) {
      if (/creativecommons.org/.test(caption)) assert.match(visibleText(caption), /Resized and converted to WebP/);
    }
  }
});

test('accessibility information is useful without asserting conformance', async () => {
  const html = await readRoute('/accessibility/').catch(() => '');
  assert.match(visibleText(html), /Using this website/);
  assert.match(html, /mailto:hanginkitecenter@gmail.com/);
  assert.doesNotMatch(visibleText(html), /fully (?:accessible|compliant)|certified|WCAG conformant/i);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
});

test('structured data across every route contains no unconfirmed commercial fields', async () => {
  function inspect(value) {
    if (!value || typeof value !== 'object') return;
    const types = [value['@type']].flat();
    for (const type of types) assert.ok(!['Offer', 'AggregateOffer', 'OfferCatalog', 'Review', 'AggregateRating'].includes(type), type);
    for (const [key, child] of Object.entries(value)) {
      assert.ok(!['price','lowPrice','highPrice','priceCurrency','availability','openingHours','openingHoursSpecification'].includes(key), key);
      inspect(child);
    }
  }
  for (const route of publicRoutes) for (const block of jsonLdBlocks(await readRoute(route))) inspect(block);
  // Ordinary prose is outside this structured-data assertion.
  inspect({ '@type': 'WebPage', description: 'Review the details with Hangin.' });
});

function assertSecurityHeaders(source) {
  const lines = source.trimEnd().split(/\r?\n/).filter(line => line.trim());
  assert.equal(lines.shift(), '/*', 'Headers must cover every exported path');
  const headers = new Headers();
  for (const line of lines) {
    assert.match(line, /^\s{2}\S[^:]*: .+$/, 'Unexpected header rule or declaration');
    const colon = line.indexOf(':');
    const name = line.slice(0, colon).trim();
    assert.equal(headers.has(name), false, `Duplicate header: ${name}`);
    headers.set(name, line.slice(colon + 1).trim());
  }
  for (const [name, value] of Object.entries({
    'Strict-Transport-Security': 'max-age=31536000',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
  })) assert.equal(headers.get(name), value, name);
  const permissionEntries = (headers.get('Permissions-Policy') ?? '').split(',').map(value => value.trim());
  const permissions = new Set(permissionEntries);
  assert.equal(permissionEntries.length, permissions.size, 'Duplicate Permissions-Policy entries');
  assert.deepEqual(permissions, new Set(['accelerometer', 'camera', 'geolocation', 'gyroscope', 'microphone', 'payment', 'usb'].map(feature => `${feature}=()`)));
  const csp = new Map();
  for (const declaration of (headers.get('Content-Security-Policy') ?? '').split(';').filter(value => value.trim())) {
    const [name, ...values] = declaration.trim().split(/\s+/);
    assert.equal(csp.has(name), false, `Duplicate CSP directive: ${name}`);
    csp.set(name, new Set(values));
  }
  for (const name of ['default-src', 'base-uri', 'connect-src', 'font-src', 'manifest-src', 'media-src', 'worker-src']) {
    assert.deepEqual(csp.get(name), new Set(["'self'"]), name);
  }
  for (const name of ['form-action', 'frame-ancestors', 'frame-src', 'object-src']) {
    assert.deepEqual(csp.get(name), new Set(["'none'"]), name);
  }
  assert.deepEqual(csp.get('img-src'), new Set(["'self'", 'data:']));
  for (const name of ['script-src', 'style-src']) {
    assert.deepEqual(csp.get(name), new Set(["'self'", "'unsafe-inline'"]), name);
  }
  assert.deepEqual(csp.get('upgrade-insecure-requests'), new Set());
  assert.equal(csp.has('navigate-to'), false, 'Ordinary contact navigation must remain available');
  assert.equal(csp.has('sandbox'), false, 'Do not sandbox the exported document');
  assert.deepEqual(new Set(csp.keys()), new Set([
    'default-src', 'base-uri', 'connect-src', 'font-src', 'manifest-src', 'media-src', 'worker-src',
    'form-action', 'frame-ancestors', 'frame-src', 'object-src', 'img-src', 'script-src', 'style-src',
    'upgrade-insecure-requests',
  ]), 'Unreviewed CSP directives can override checked fallbacks');
}

test('static security headers ship in the export without blocking the contact destination', async () => {
  const headers = await readFile(path.join(outDir, '_headers'), 'utf8').catch(() => '');
  assertSecurityHeaders(headers);
  await access(path.join(outDir, 'images/ATTRIBUTION.md'));
});

test('header contract rejects removed protections, partial route coverage and unsafe sources', async () => {
  const headers = await readFile(path.join(outDir, '_headers'), 'utf8');
  for (const name of ['Strict-Transport-Security', 'Referrer-Policy', 'Permissions-Policy', 'X-Content-Type-Options', 'X-Frame-Options', 'Cross-Origin-Opener-Policy', 'Cross-Origin-Resource-Policy']) {
    const weakened = headers.split('\n').filter(line => !line.trimStart().startsWith(`${name}:`)).join('\n');
    assert.throws(() => assertSecurityHeaders(weakened), undefined, name);
  }
  for (const [before, after] of [
    ['/*', '/contact/*'],
    ["script-src 'self' 'unsafe-inline'", "script-src * 'unsafe-inline'"],
    ["connect-src 'self'", 'connect-src https:'],
    ["frame-ancestors 'none';", ''],
    ["form-action 'none'", "form-action 'self'"],
    ['microphone=()', 'microphone=*'],
    ['camera=()', 'camera=(), camera=*'],
    ['upgrade-insecure-requests', 'SANDBOX; upgrade-insecure-requests'],
    ['upgrade-insecure-requests', 'script-src-elem *; upgrade-insecure-requests'],
    ['upgrade-insecure-requests', 'style-src-elem *; upgrade-insecure-requests'],
  ]) {
    assert.ok(headers.includes(before), `Fixture must mutate the actual policy: ${before}`);
    assert.throws(() => assertSecurityHeaders(headers.replace(before, after)), undefined, before);
  }
});

test('export attribute helper reads exact attributes and apostrophes within quoted URLs', () => {
  assert.equal(attribute('<a data-href="/placeholder" href="https://wa.me/1?text=I\'d">', 'href'), "https://wa.me/1?text=I'd");
  assert.equal(attribute('<img data-src="/placeholder" src = "/photo.webp">', 'src'), '/photo.webp');
  assert.equal(attribute('<svg viewBox="0 0 24 24">', 'viewBox'), '0 0 24 24');
});


test('rendered generated images retain a nearby illustration label and decorative alt text', async () => {
  const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
  function walk(node) { return [node, ...(node.childNodes ?? []).flatMap(walk)]; }
  function text(node) { return walk(node).filter(item => item.nodeName === '#text').map(item => item.value).join(' ').trim(); }
  function hidden(node) {
    for (let parent = node; parent; parent = parent.parentNode) {
      if (attr(parent, 'hidden') !== undefined || attr(parent, 'aria-hidden') === 'true' || attr(parent, 'inert') !== undefined) return true;
    }
    return false;
  }
  const checkedByRoute = new Map();
  for (const route of publicRoutes) {
    const nodes = walk(parse(await readRoute(route)));
    for (const img of nodes.filter(node => node.tagName === 'img' && attr(node, 'src')?.includes('/images/owner/'))) {
      const container = img.parentNode.tagName === 'picture' ? img.parentNode.parentNode : img.parentNode;
      const label = walk(container).find(node => ['span', 'figcaption'].includes(node.tagName) && /^(Supporting illustration\.|Illustration)$/.test(text(node)));
      assert.equal(label, undefined, `${route}: owner photograph mislabeled as illustration`);
    }
    for (const img of nodes.filter(node => node.tagName === 'img' && attr(node, 'src')?.includes('/images/generated/'))) {
      assert.equal(attr(img, 'alt'), '', `${route}: generated illustration must be decorative`);
      const container = img.parentNode.tagName === 'picture' ? img.parentNode.parentNode : img.parentNode;
      const label = walk(container).find(node => ['span', 'figcaption'].includes(node.tagName) && /^(Supporting illustration\.|Illustration)$/.test(text(node)));
      assert.ok(label && !hidden(label), `${route}: missing associated, semantically visible illustration label`);
      checkedByRoute.set(route, (checkedByRoute.get(route) ?? 0) + 1);
    }
  }
  assert.deepEqual(checkedByRoute, new Map([['/', 2], ['/kite-safaris/', 1], ['/accommodation/', 1]]), 'Check every current illustration; owner photographs must remain photographs');
});
