import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { auditHtml, auditCss, auditExport } from '../scripts/privacy-audit.mjs';

const origin = 'https://www.hanginkitecenter.com';
const cases = [
  ['inline cookie writer', '<script>document.cookie="visitor=123"</script>', 'authored-script'],
  ['inline analytics', '<script>fbq("track", "PageView")</script>', 'authored-script'],
  ['computed runtime loader', '<script>const s=document.createElement("script");s.src="https://collector.example/t.js";document.head.append(s)</script>', 'authored-script'],
  ['same-origin executable', '<script src="/telemetry.js"></script>', 'authored-script'],
  ['data-src cannot mask src', '<script data-src="/placeholder.js" src="https://collector.example/t.js"></script>', 'external-resource'],
  ['data-href cannot mask href', '<link rel="stylesheet" data-href="/local.css" href="https://collector.example/a.css">', 'external-resource'],
  ['spaces in attributes', '<script src = "https://collector.example/t.js"></script>', 'external-resource'],
  ['protocol-relative resource', '<img src="//collector.example/a.jpg">', 'external-resource'],
  ['later srcset candidate', '<img src="/a.jpg" srcset="/a.jpg 400w, https://collector.example/a.jpg 800w">', 'external-resource'],
  ['picture source srcset', '<picture><source srcset="/a.jpg 1x, //collector.example/a.jpg 2x"><img src="/a.jpg"></picture>', 'external-resource'],
  ['media source', '<video><source src="https://collector.example/a.mp4"></video>', 'external-resource'],
  ['link responsive preload', '<link rel="preload" as="image" imagesrcset="/a.jpg 1x, //collector.example/a.jpg 2x">', 'external-resource'],
  ['anchor ping', '<a href="https://wa.me/123" ping="/measure https://collector.example/ping">Message</a>', 'tracking-ping'],
  ['inline style URLs', '<div style="background:url(https://collector.example/a.jpg)">A</div>', 'external-resource'],
  ['style import', '<style>@import "//collector.example/a.css";</style>', 'external-resource'],
  ['event handler', '<img src="/a.jpg" onload="document.cookie=1">', 'authored-script'],
  ['javascript navigation', '<a href="java&#x73;cript:alert(1)">A</a>', 'authored-script'],
  ['base origin override', '<base href="https://collector.example/"><img src="local.jpg">', 'unsupported-base'],
  ['framework prefix spoof', '<script>self.__next_f.push([1,"data"]);document.cookie="x=y"</script>', 'authored-script'],
  ['framework executable argument spoof', '<script>self.__next_f.push([1,fetch("/collect")])</script>', 'authored-script'],
  ['framework directory alone insufficient', '<script src="/_next/static/chunks/forged.js"></script>', 'authored-script'],
];
for (const [name, html, code] of cases) test(`rejects ${name}`, () => {
  const result = auditHtml({html, url: origin});
  assert.ok(result.findings.some(f => f.code === code), JSON.stringify(result));
});

test('allows ordinary outbound navigation and same-origin absolute resources', () => {
  const result = auditHtml({html: `<a href="https://wa.me/123">WhatsApp</a><img src="${origin}/a.jpg"><img src="/b.jpg">`, url: origin});
  assert.deepEqual(result.findings, []);
  assert.equal(result.resources.length, 2);
});

test('allows inert JSON-LD but narrowly classifies only literal Next Flight calls', () => {
  const result = auditHtml({html: '<script type="application/ld+json">{"url":"https://schema.org"}</script><script>(self.__next_f=self.__next_f||[]).push([0])</script><script>self.__next_f.push([1,"flight data"])</script>', url: origin});
  assert.deepEqual(result.findings, []);
  assert.equal(result.framework.length, 2);
});

for (const css of [
  '@import "https://collector.example/a.css";',
  '@import url(//collector.example/a.css);',
  '.a{background:url(https://collector.example/a.jpg)}',
  '.a{background:image-set("/a.jpg" 1x,"https://collector.example/a.jpg" 2x)}',
  '.a{background:u\\72l(https://collector.example/a.jpg)}',
  '@font-face{font-family:a;src:url(https://collector.example/a.woff2)}',
]) test(`rejects CSS resource: ${css}`, () => {
  assert.ok(auditCss({css, url: `${origin}/a.css`}).findings.some(f => ['external-resource', 'unparsed-css'].includes(f.code)));
});

async function fixture(t, files) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'hangin-audit-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  for (const [file, text] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(root, file)), {recursive: true});
    await writeFile(path.join(root, file), text);
  }
  return root;
}
const baseline = {'out/index.html': '<h1>Home</h1>', 'out/sitemap.xml': `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>`};

test('scans authored public JS even when it is not linked from HTML', async t => {
  const root = await fixture(t, {...baseline, 'public/telemetry.js': 'document.cookie="x=y"'});
  const result = await auditExport({root, origin, expectedRoutes: ['/']});
  assert.ok(result.findings.some(f => f.code === 'authored-script' && f.file.includes('telemetry.js')));
});
test('scans standalone exported HTML and CSS', async t => {
  const root = await fixture(t, {...baseline, 'out/extra.html': '<script>fbq("track","PageView")</script>', 'out/custom.css': '@import "https://collector.example/a.css";'});
  const result = await auditExport({root, origin, expectedRoutes: ['/']});
  assert.ok(result.findings.some(f => f.code === 'authored-script'));
  assert.ok(result.findings.some(f => ['external-resource', 'unparsed-css'].includes(f.code)));
});
test('requires framework bundle bytes to match the local build and records their limitation', async t => {
  const root = await fixture(t, {...baseline, 'out/_next/static/chunks/a.js': 'framework()', '.next/static/chunks/a.js': 'different()'});
  const result = await auditExport({root, origin, expectedRoutes: ['/']});
  assert.ok(result.findings.some(f => f.code === 'unverified-framework'));
});
test('does not pass missing or incomplete export coverage', async t => {
  const root = await fixture(t, baseline);
  const result = await auditExport({root, origin, expectedRoutes: ['/', '/contact/']});
  assert.ok(result.findings.some(f => f.code === 'route-coverage'));
});

test('parses resource declarations inside modern supports conditions', () => {
  const prefix = '@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b))))';
  assert.deepEqual(auditCss({css:`${prefix}{a{color:red}}`, url:origin}).findings, []);
  assert.ok(auditCss({css:`${prefix}{a{background:url(https://collector.example/p)}}`, url:origin}).findings.some(f => f.code === 'external-resource'));
});

test('rejects escaped CSS import keywords', () => {
  const css = String.raw`@\69mport "https://collector.example/a.css";`;
  assert.ok(auditCss({css, url:origin}).findings.length > 0);
});
test('fails authored client boundaries before classifying compiled bundles', async t => {
  const root = await fixture(t, {...baseline, 'components/tracker.tsx':'"use client"; export default function Tracker(){ return null; }'});
  const result = await auditExport({root, origin, expectedRoutes:['/']});
  assert.ok(result.findings.some(f => f.code === 'authored-client-runtime'));
});
test('records build-matched framework hashes, without treating arbitrary Next paths as trusted', async t => {
  const root = await fixture(t, {...baseline, 'out/index.html':'<script src="/_next/static/chunks/a.js"></script>', 'out/_next/static/chunks/a.js':'framework()', '.next/static/chunks/a.js':'framework()'});
  const result = await auditExport({root, origin, expectedRoutes:['/']});
  assert.deepEqual(result.findings, []);
  assert.match(result.frameworkAssets.get('/_next/static/chunks/a.js'), /^[a-f0-9]{64}$/);
  assert.ok(result.limitations.length > 0);
});
test('fails absent export rather than passing zero inspected files', async t => {
  const root = await fixture(t, {'public/a.txt':'hello'});
  const result = await auditExport({root, origin, expectedRoutes:['/']});
  assert.ok(result.findings.some(f => f.code === 'missing-export'));
});

for (const html of [
  '<svg><filter><feImage href="https://collector.example/pixel"/></filter></svg>',
  '<svg><filter><feImage xlink:href="https://collector.example/pixel"/></filter></svg>',
  '<body background="https://collector.example/pixel">Hi</body>',
  '<table background="https://collector.example/pixel"><tr><td>Hi</td></tr></table>',
]) test(`rejects SVG filter or legacy background resource: ${html}`, () => {
  const result = auditHtml({html, url:origin});
  assert.ok(result.findings.some(f => f.code === 'external-resource'));
});
test('discovers same-origin SVG filter and legacy background resources', () => {
  const result = auditHtml({html:'<body background="/body.jpg"><svg><filter><feImage xlink:href="/filter.svg"/></filter></svg></body>', url:origin});
  assert.deepEqual(result.findings, []);
  assert.deepEqual(result.resources.map(r => r.url).sort(), [`${origin}/body.jpg`, `${origin}/filter.svg`]);
});
test('never returns URL credentials, query values or fragments in HTML/CSS evidence', () => {
  const secrets = ['private-user', 'private-password', 'private-token', 'private-fragment'];
  const url = 'https://private-user:private-password@www.hanginkitecenter.com/page?token=private-token#private-fragment';
  const html = `<script>document.cookie=1</script><script>self.__next_f.push([1,"data"])</script><img src="${url}"><img src="https://private-user:private-password@collector.example/p?token=private-token#private-fragment"><style>@import "${url}";</style>`;
  for (const result of [auditHtml({html, url}), auditCss({css:`a{background:url("${url}")}`,url})]) {
    const serialized = JSON.stringify(result);
    for (const secret of secrets) assert.ok(!serialized.includes(secret), `Report exposed ${secret}`);
    assert.ok(result.resources.some(r => r.url === `${origin}/page`));
  }
});
