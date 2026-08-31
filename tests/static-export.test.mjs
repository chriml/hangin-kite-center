import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { outDir, readRoute, title } from "./export-helpers.mjs";

test("build emits a static homepage, 404, and metadata files", async () => {
  await Promise.all([
    access(path.join(outDir, "index.html")),
    access(path.join(outDir, "404.html")),
    access(path.join(outDir, "robots.txt")),
    access(path.join(outDir, "sitemap.xml")),
    access(path.join(outDir, "manifest.webmanifest")),
  ]);
});

test("the exported 404 is useful and not indexable", async () => {
  const html = await readFile(path.join(outDir, "404.html"), "utf8");
  assert.match(html, /We couldn't find that page/i);
  assert.equal(title(html), "Page not found | Hangin Kite Center");
  assert.equal(
    (html.match(/name="robots" content="noindex"/gi) ?? []).length,
    1,
    "404 should emit one unambiguous noindex directive",
  );
  assert.doesNotMatch(html, /name="robots" content="index, follow"/i);
  assert.doesNotMatch(
    html,
    /<link rel="canonical" href="https:\/\/www\.hanginkitecenter\.com\/"/i,
  );
  assert.doesNotMatch(html, /Kitesurfing in Boracay \| Hangin Kite Center/i);
});

test("homepage content is present in exported HTML", async () => {
  const html = await readRoute("/");
  assert.match(html, /<main\b/i);
  assert.match(html, /Hangin Kite Center/i);
});
