import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { CONTENT_SIGNAL, estimateTokens, onRequest, prefersMarkdown } from "../functions/_middleware.js";
import { htmlToMarkdown } from "../scripts/build-markdown.mjs";
import { linkHref, metaContent, outDir, pendingSafariRoutes, publicRoutes, readRoute, title } from "./export-helpers.mjs";

const origin = "https://hanginkitecenter.com";
const markdownFile = route => path.join(outDir, route.replace(/^\//, ""), "index.md");

test("Accept parsing selects Markdown only when it is preferred", () => {
  for (const accept of ["text/markdown", "text/markdown, text/html;q=0.9", "text/html;q=0.5, text/markdown", "text/markdown;q=0.8, */*", "TEXT/MARKDOWN"]) {
    assert.equal(prefersMarkdown(accept), true, accept);
  }
  for (const accept of [null, "", "*/*", "text/html", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "text/html, text/markdown;q=0.5", "text/markdown;q=0"]) {
    assert.equal(prefersMarkdown(accept), false, String(accept));
  }
});

function fakeContext(url, { accept, method = "GET", assets = {} } = {}) {
  const calls = { next: 0, assets: [] };
  const htmlHeaders = { "Content-Type": "text/html; charset=utf-8", "Content-Security-Policy": "default-src 'self'" };
  const context = {
    request: new Request(url, { method, headers: accept ? { Accept: accept } : {} }),
    next: async () => { calls.next += 1; return new Response("<!doctype html><p>page</p>", { headers: htmlHeaders }); },
    env: {
      ASSETS: {
        fetch: async (request) => {
          const pathname = new URL(request.url).pathname;
          calls.assets.push(pathname);
          if (!(pathname in assets)) return new Response("<!doctype html><p>missing</p>", { status: 404, headers: htmlHeaders });
          return new Response(assets[pathname], { headers: { "Content-Type": "text/markdown", "Content-Security-Policy": "default-src 'self'", "Link": `<${origin}/about/>; rel="canonical"` } });
        },
      },
    },
  };
  return { context, calls };
}

const markdownBody = "---\ntitle: \"About\"\nurl: \"https://hanginkitecenter.com/about/\"\n---\n\n# About\n";

test("Markdown requests receive the Markdown twin with negotiation headers", async () => {
  const { context, calls } = fakeContext(`${origin}/about/`, { accept: "text/markdown", assets: { "/about/index.md": markdownBody } });
  const response = await onRequest(context);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "text/markdown; charset=utf-8");
  assert.match(response.headers.get("Vary"), /Accept/);
  assert.equal(response.headers.get("x-markdown-tokens"), String(estimateTokens(markdownBody)));
  assert.equal(response.headers.get("Content-Signal"), CONTENT_SIGNAL);
  assert.equal(response.headers.get("Content-Security-Policy"), "default-src 'self'", "asset headers are preserved");
  assert.match(response.headers.get("Link"), /rel="canonical"/);
  assert.equal(response.headers.get("X-Robots-Tag"), null);
  assert.equal(await response.text(), markdownBody);
  assert.deepEqual(calls.assets, ["/about/index.md"]);
  assert.equal(calls.next, 0);
});

test("the homepage maps to /index.md and HEAD has headers but no body", async () => {
  const { context, calls } = fakeContext(`${origin}/`, { accept: "text/markdown", method: "HEAD", assets: { "/index.md": markdownBody } });
  const response = await onRequest(context);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "text/markdown; charset=utf-8");
  assert.ok(response.headers.get("x-markdown-tokens"));
  assert.equal(await response.text(), "");
  assert.deepEqual(calls.assets, ["/index.md"]);
});

test("noindex pages stay noindex in Markdown", async () => {
  const body = "---\ntitle: \"Events\"\nrobots: \"noindex, follow\"\n---\n\n# Events\n";
  const { context } = fakeContext(`${origin}/events/`, { accept: "text/markdown", assets: { "/events/index.md": body } });
  const response = await onRequest(context);
  assert.equal(response.headers.get("X-Robots-Tag"), "noindex");
});

test("browsers and default clients receive HTML with Vary: Accept", async () => {
  for (const accept of [undefined, "text/html,application/xhtml+xml,*/*;q=0.8", "*/*"]) {
    const { context, calls } = fakeContext(`${origin}/about/`, { accept, assets: { "/about/index.md": markdownBody } });
    const response = await onRequest(context);
    assert.equal(response.headers.get("Content-Type"), "text/html; charset=utf-8");
    assert.equal(response.headers.get("Vary"), "Accept");
    assert.equal(response.headers.get("Content-Security-Policy"), "default-src 'self'");
    assert.equal(calls.next, 1);
    assert.deepEqual(calls.assets, []);
  }
});

test("missing Markdown, assets, unslashed paths and other methods fall through", async () => {
  const missing = fakeContext(`${origin}/missing/`, { accept: "text/markdown" });
  const response = await onRequest(missing.context);
  assert.equal(response.headers.get("Content-Type"), "text/html; charset=utf-8");
  assert.equal(response.headers.get("Vary"), "Accept");
  assert.equal(missing.calls.next, 1);

  for (const [url, method] of [[`${origin}/about`, "GET"], [`${origin}/robots.txt`, "GET"], [`${origin}/about/`, "POST"]]) {
    const { context, calls } = fakeContext(url, { accept: "text/markdown", method });
    const passed = await onRequest(context);
    assert.equal(passed.headers.get("Vary"), null, url);
    assert.equal(calls.next, 1, url);
    assert.deepEqual(calls.assets, [], url);
  }
});

test("Content-Signal matches robots.txt", async () => {
  const robots = await readFile(path.join(outDir, "robots.txt"), "utf8");
  assert.match(robots, new RegExp(`Content-Signal: ${CONTENT_SIGNAL}`));
  const headers = await readFile("public/_headers", "utf8");
  assert.match(headers, new RegExp(`/\\*\\.md\\n(?:  .*\\n)*  Content-Signal: ${CONTENT_SIGNAL}`));
});

test("the converter renders structure, absolute links and skips chrome", () => {
  const html = `<!doctype html><html><head><title>T | Hangin</title><meta name="description" content="D"><link rel="canonical" href="${origin}/x/"></head>
    <body><header><nav><a href="/">Menu</a></nav></header><main><h1>Heading</h1><p>Text with <a href="/contact/">a link</a> and <strong>bold</strong>.</p>
    <ul><li>One</li><li>Two</li></ul><div aria-hidden="true">Hidden</div><script>alert(1)</script><button>Press</button>
    <table><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table><img src="/i.webp" alt="Kite on sand"><img src="/d.svg" alt=""></main>
    <footer><a href="tel:+1">Call</a><a href="mailto:a@b.c">Email</a></footer></body></html>`;
  const markdown = htmlToMarkdown(html);
  assert.match(markdown, /^---\ntitle: "T \| Hangin"\ndescription: "D"\nurl: "https:\/\/hanginkitecenter\.com\/x\/"\n---\n/);
  assert.match(markdown, /^# Heading$/m);
  assert.match(markdown, /Text with \[a link\]\(https:\/\/hanginkitecenter\.com\/contact\/\) and \*\*bold\*\*\./);
  assert.match(markdown, /^- One\n- Two$/m);
  assert.match(markdown, /^\| A \| B \|\n\| --- \| --- \|\n\| 1 \| 2 \|$/m);
  assert.match(markdown, /!\[Kite on sand\]\(https:\/\/hanginkitecenter\.com\/i\.webp\)/);
  assert.match(markdown, /\[Call\]\(tel:\+1\) · \[Email\]\(mailto:a@b\.c\)/);
  for (const absent of ["Menu", "Hidden", "alert", "Press", "d.svg"]) assert.doesNotMatch(markdown, new RegExp(absent));
});

test("every exported page has a Markdown twin that matches its HTML", async () => {
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    const markdown = await readFile(markdownFile(route), "utf8");
    const frontmatter = /^---\n([\s\S]*?)\n---\n/.exec(markdown)?.[1];
    assert.ok(frontmatter, `${route}: frontmatter`);
    assert.equal(JSON.parse(/^title: (.*)$/m.exec(frontmatter)[1]), title(html).replace(/&amp;/g, "&").replace(/&#x27;/g, "'"), `${route}: title`);
    assert.equal(JSON.parse(/^url: (.*)$/m.exec(frontmatter)[1]), linkHref(html, "canonical"), `${route}: canonical`);
    assert.equal(/^url: /m.test(frontmatter) && linkHref(html, "canonical"), `${origin}${route}`);
    const robots = metaContent(html, "name", "robots") ?? "";
    assert.equal(/noindex/.test(frontmatter), /noindex/.test(robots), `${route}: robots parity`);
    if (pendingSafariRoutes.includes(route)) assert.match(frontmatter, /noindex/);
    assert.equal((markdown.match(/^# /gm) ?? []).length, 1, `${route}: one H1`);
    assert.match(markdown, /\]\(https:\/\/wa\.me\/639380101849/, `${route}: WhatsApp contact path`);
    assert.doesNotMatch(markdown, /<(?:script|style|svg|iframe|div|span|button)\b/i, `${route}: leftover HTML`);
    assert.doesNotMatch(markdown, /\]\(\/(?!\/)/, `${route}: relative links`);
  }
});

test("error pages have no Markdown twin and Functions skip static asset folders", async () => {
  for (const dir of ["404", "_not-found"]) {
    await assert.rejects(readFile(path.join(outDir, dir, "index.md")), { code: "ENOENT" });
  }
  const routes = JSON.parse(await readFile(path.join(outDir, "_routes.json"), "utf8"));
  assert.equal(routes.version, 1);
  assert.deepEqual(routes.include, ["/*"]);
  for (const prefix of ["/_next/*", "/images/*", "/videos/*", "/fonts/*"]) assert.ok(routes.exclude.includes(prefix), prefix);
  assert.ok(routes.include.length + routes.exclude.length <= 100);
});

// Direct asset URLs bypass negotiation, so their host rules must preserve robots policy.
test("direct Markdown noindex rules match the exported HTML policy", async () => {
  const headers = await readFile(path.join(outDir, "_headers"), "utf8");
  const noindexPaths = [...headers.matchAll(/^([^\n]+)\n  X-Robots-Tag: noindex$/gm)].map(match => match[1]);
  const expected = [];
  for (const route of publicRoutes) {
    if (/noindex/.test(metaContent(await readRoute(route), "name", "robots") ?? "")) {
      expected.push(`${route}index.md`);
    }
  }
  assert.deepEqual(noindexPaths.sort(), expected.sort());
});
