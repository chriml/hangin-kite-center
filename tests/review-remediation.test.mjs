import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
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

test('all WhatsApp exits disclose the new tab and reference message guidance', async () => {
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    assert.match(html, /id="message-guidance"/);
    for (const link of tags(html, 'a').filter(a => attribute(a, 'href')?.startsWith('https://wa.me/'))) {
      assert.match(attribute(link, 'aria-label') ?? '', /opens in a new tab/i, route);
      assert.equal(attribute(link, 'aria-describedby'), 'message-guidance');
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

test('licensed photo captions disclose modifications and footer clarifies image rights', async () => {
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    assert.match(visibleText(html), /Images are owned by or licensed for use by Hangin Kite Center/);
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

test('static security headers ship in the export without blocking the contact destination', async () => {
  const headers = await readFile(path.join(outDir, '_headers'), 'utf8').catch(() => '');
  assert.match(headers, /frame-ancestors 'none'/);
  assert.match(headers, /form-action 'none'/);
  assert.match(headers, /Referrer-Policy: no-referrer/);
  assert.doesNotMatch(headers, /navigate-to|sandbox/);
  await access(path.join(outDir, 'images/ATTRIBUTION.md'));
});

test('export attribute helper reads exact attributes and apostrophes within quoted URLs', () => {
  assert.equal(attribute('<a data-href="/placeholder" href="https://wa.me/1?text=I\'d">', 'href'), "https://wa.me/1?text=I'd");
  assert.equal(attribute('<img data-src="/placeholder" src = "/photo.webp">', 'src'), '/photo.webp');
});
