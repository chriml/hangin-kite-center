import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { outDir, readRoute } from "./export-helpers.mjs";

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
  assert.match(html, /name="robots" content="noindex"/i);
});

test("homepage content is present in exported HTML", async () => {
  const html = await readRoute("/");
  assert.match(html, /<main\b/i);
  assert.match(html, /Hangin Kite Center/i);
});
