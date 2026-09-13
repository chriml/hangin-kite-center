import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import test from 'node:test';
import { auditDeployment } from '../scripts/audit-deployed-privacy.mjs';

async function serve(t, responses) {
  const server = createServer((req, res) => {
    const entry = responses[req.url] ?? {status:404, body:'Missing'};
    res.writeHead(entry.status ?? 200, {'Content-Type': entry.type ?? 'text/html', ...entry.headers});
    res.end(typeof entry.body === 'function' ? entry.body(origin) : entry.body ?? '');
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  t.after(() => new Promise(resolve => server.close(resolve)));
  return origin;
}
const sitemap = routes => ({type:'application/xml', body: origin => `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${origin}${route}</loc></url>`).join('')}</urlset>`});
const clean = {'/': {body:'<h1>Home</h1>'}, '/contact/': {body:'<h1>Contact</h1>'}, '/sitemap.xml':sitemap(['/', '/contact/'])};

test('missing sitemap cannot fall back to a successful homepage-only audit', async t => {
  const origin = await serve(t, {...clean, '/sitemap.xml':{status:404}, '/contact/':{body:'<script>fbq("track")</script>'}});
  const result = await auditDeployment({origin, expectedRoutes:['/', '/contact/']});
  assert.ok(result.findings.some(f => f.code === 'sitemap-coverage'));
  assert.ok(result.findings.some(f => f.code === 'authored-script'));
});
test('remote sitemap cannot silently omit an expected route', async t => {
  const origin = await serve(t, {...clean, '/sitemap.xml':sitemap(['/'])});
  const result = await auditDeployment({origin, expectedRoutes:['/', '/contact/']});
  assert.ok(result.findings.some(f => f.code === 'sitemap-coverage'));
  assert.ok(result.routes.includes('/contact/'));
});
test('checks Set-Cookie on every redirect response', async t => {
  const origin = await serve(t, {...clean, '/contact/':{status:302, headers:{Location:'/contact-final/', 'Set-Cookie':'marketing_id=123; Path=/' }}, '/contact-final/':{body:'<h1>Contact</h1>'}});
  const result = await auditDeployment({origin, expectedRoutes:['/', '/contact/']});
  assert.ok(result.findings.some(f => f.code === 'set-cookie' && f.url.endsWith('/contact/')));
  assert.ok(result.responses.some(r => r.url.endsWith('/contact-final/') && r.status === 200));
});
test('rejects incomplete routes hidden by redirects to the homepage', async t => {
  const origin = await serve(t, {...clean, '/contact/':{status:302, headers:{Location:'/'}}});
  const result = await auditDeployment({origin, expectedRoutes:['/', '/contact/']});
  assert.ok(result.findings.some(f => f.code === 'route-coverage'));
});
test('inspects same-origin stylesheets, nested imports and resource response cookies', async t => {
  const origin = await serve(t, {...clean, '/':{body:'<link rel="stylesheet" href="/a.css">'}, '/a.css':{type:'text/css', body:'@import "/b.css";'}, '/b.css':{type:'text/css', body:'body{background:url(https://collector.example/pixel)}', headers:{'Set-Cookie':'id=123'}}});
  const result = await auditDeployment({origin, expectedRoutes:['/', '/contact/']});
  assert.ok(result.findings.some(f => f.code === 'external-resource'));
  assert.ok(result.findings.some(f => f.code === 'set-cookie' && f.url.endsWith('/b.css')));
});
test('rejects cross-origin redirects without contacting their destination', async t => {
  const origin = await serve(t, {...clean, '/contact/':{status:302, headers:{Location:'https://collector.example/'}}});
  const result = await auditDeployment({origin, expectedRoutes:['/', '/contact/']});
  assert.ok(result.findings.some(f => f.code === 'external-redirect'));
});
test('accepts complete clean coverage and records every required route', async t => {
  const origin = await serve(t, clean);
  const result = await auditDeployment({origin, expectedRoutes:['/', '/contact/']});
  assert.deepEqual(result.findings, []);
  assert.deepEqual(result.routes.sort(), ['/', '/contact/']);
});
test('audits noindex pages while comparing sitemap only against indexable routes', async t => {
  const origin = await serve(t, {...clean, '/events/':{body:'<h1>Events</h1><script>fetch("/collect")</script>'}});
  const result = await auditDeployment({origin, expectedRoutes:['/', '/contact/', '/events/'], expectedIndexableRoutes:['/', '/contact/']});
  assert.ok(!result.findings.some(f => f.code === 'sitemap-coverage'));
  assert.ok(result.routes.includes('/events/'));
  assert.ok(result.findings.some(f => f.code === 'authored-script'));
});

test('requires trusted route expectations even when remote sitemap is available', async t => {
  const origin = await serve(t, clean);
  const result = await auditDeployment({origin, expectedRoutes:[]});
  assert.ok(result.findings.some(f => f.code === 'route-coverage'));
});
test('rejects malformed sitemap XML', async t => {
  const origin = await serve(t, {...clean, '/sitemap.xml':{body:'<urlset><url><loc>/</urlset>'}});
  const result = await auditDeployment({origin, expectedRoutes:['/', '/contact/']});
  assert.ok(result.findings.some(f => f.code === 'sitemap-coverage'));
});
test('does not trust deployed JavaScript only because its filename matches a local bundle', async t => {
  const origin = await serve(t, {...clean, '/':{body:'<script src="/_next/static/chunks/a.js"></script>'}, '/_next/static/chunks/a.js':{type:'text/javascript',body:'document.cookie="tracking=1"'}});
  const result = await auditDeployment({origin, expectedRoutes:['/', '/contact/'], frameworkAssets:new Map([['/_next/static/chunks/a.js','0000000000000000000000000000000000000000000000000000000000000000']])});
  assert.ok(result.findings.some(f => f.code === 'unverified-framework'));
});

test('follows full internal query URLs but sanitizes every returned URL and response header', async t => {
  const requests = [];
  const origin = await serve(t, {...clean,
    '/':{status:302, headers:{Location:'/?token=redirect-private#fragment-private'}},
    '/?token=redirect-private':{body:'<body background="/pixel?token=background-private"><svg><filter><feImage href="/filter.svg?token=filter-private"/></filter></svg><script>self.__next_f.push([1,"data"])</script><img src="/pixel?token=image-private"><img src="http://user-private:password-private@127.0.0.1/private?token=credential-private"><link rel="stylesheet" href="/style.css?token=style-private"></body>'},
    '/pixel?token=background-private':{type:'image/png',body:() => { requests.push('background'); return ''; }},
    '/pixel?token=image-private':{type:'image/png',body:() => { requests.push('image'); return ''; }},
    '/filter.svg?token=filter-private':{type:'image/svg+xml',body:() => { requests.push('filter'); return '<svg/>'; }},
    '/style.css?token=style-private':{type:'text/css; token=header-private',headers:{'Set-Cookie':'cookie-private=1'},body:()=>{requests.push('style'); return 'a{background:url(https://collector.example/p?token=external-private#css-private)}';}},
  });
  const result = await auditDeployment({origin, expectedRoutes:['/', '/contact/']});
  assert.deepEqual(requests.sort(), ['background','filter','image','style']);
  assert.ok(result.findings.some(f => f.code === 'set-cookie'));
  assert.ok(result.responses.some(r => r.url === `${origin}/` && r.status === 200));
  assert.ok(!JSON.stringify(result).includes('-private'), 'Report contains fixture secret');
});
test('never includes fetched XML token text in error details', async t => {
  const origin = await serve(t, {...clean, '/sitemap.xml':{body:'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>&xml-private;</loc></url></urlset>'}});
  const result = await auditDeployment({origin, expectedRoutes:['/', '/contact/']});
  assert.ok(result.findings.some(f => f.code === 'sitemap-coverage'));
  assert.ok(!JSON.stringify(result).includes('xml-private'));
});
