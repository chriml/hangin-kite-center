import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { auditHtml } from '../scripts/privacy-audit.mjs';
const frames = JSON.parse(await readFile(new URL('../scripts/reviewed-embeds.json', import.meta.url)));
const origin = 'https://www.hanginkitecenter.com';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
const html = (frame, extras = {}) => `<iframe ${Object.entries({src:frame.src, ...frame.attributes, ...extras}).filter(([,value])=>value!==undefined).map(([key,value])=>`${key}="${escape(value)}"`).join(' ')}></iframe>`;

for (const frame of frames) {
  test(`permits the reviewed ${new URL(frame.src).hostname} frame only on its specified routes`, () => {
    for (const route of frame.routes) for (const suffix of ['', 'index.html']) {
      const resources = [];
      const report = auditHtml({html:html(frame),url:origin+route+suffix,onResource:r=>resources.push(r)});
      assert.deepEqual(report.findings, []);
      assert.equal(report.resources[0].kind, 'reviewed-third-party-frame');
      assert.equal(resources.length, 0, 'Do not crawl provider internals');
    }
    assert.ok(auditHtml({html:html(frame),url:origin+'/shop/'}).findings.length);
    if (new URL(frame.src).hostname === 'www.google.com') {
      assert.ok(auditHtml({html:html(frame),url:origin+'/kitesurfing-boracay/'}).findings.length);
    }
  });
  test(`rejects mutations to reviewed ${new URL(frame.src).hostname} frames`, () => {
    const changes = [
      {src:frame.src+'&visitor=123'}, {src:frame.src.replace('https:', 'http:')},
      {src:frame.src.replace('.com/', '.com.evil.test/').replace('.cz/', '.cz.evil.test/')},
      {src:frame.src.replace('0x33a53c3dcc0f9c0d', '0x0').replace('s=1280920', 's=1')},
      {srcdoc:'<script>alert(1)</script>'}, {allow:'geolocation'}, {name:'visitor'},
      {referrerpolicy:undefined}, {title:undefined}, {onload:'alert(1)'},
      {sandbox:'allow-scripts allow-same-origin allow-top-navigation'},
      {attributionsrc:'https://collector.example'}, {ping:'https://collector.example'},
      {style:'background:url(https://collector.example/a.png)'},
    ];
    if (frame.attributes.sandbox) changes.push({sandbox:undefined}, {src:frame.src.replace('m=3', 'm=1')});
    for (const change of changes) {
      assert.ok(auditHtml({html:html(frame,change),url:origin+frame.routes[0]}).findings.length, JSON.stringify(change));
    }
    for (const tag of ['object','embed']) {
      assert.ok(auditHtml({html:html(frame).replaceAll('iframe',tag),url:origin+frame.routes[0]}).findings.length);
    }
  });
}
