import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { attribute, jsonLdBlocks, outDir, publicRoutes, readRoute, tags, visibleText } from "./export-helpers.mjs";

const banned = [
  /\bvibrant\b/i,
  /\bseamless\b/i,
  /\bshowcase\b/i,
  /\benhance\b/i,
  /\bpivotal\b/i,
  /\btestament\b/i,
  /\bdelve\b/i,
  /\bfoster\b/i,
  /\bleverage\b/i,
  /\butilize\b/i,
  /\bfacilitate\b/i,
  /\bempower\b/i,
  /\bstreamline\b/i,
  /\brobust\b/i,
  /\bcutting[- ]edge\b/i,
  /\bgame[- ]changer\b/i,
  /\btapestry\b/i,
  /\brealm\b/i,
  /\bbeacon\b/i,
  /\bmultifaceted\b/i,
  /\bmeticulous\b/i,
  /\bintricate\b/i,
  /\bparamount\b/i,
  /\btransformative\b/i,
  /\belevate\b/i,
  /\bembark\b/i,
  /\bsupercharge\b/i,
  /\bever[- ]evolving\b/i,
  /\bharness (?:the (?:power|potential)|your potential)\b/i,
  /\bnot just\b/i,
  /\bit(?:'|’)s (?:worth|important) to note\b/i,
  /\b(?:let(?:'|’)s dive in|at the end of the day)\b/i,
  /\b(?:stands as a testament|marks a pivotal moment|plays a vital role)\b/i,
  /—/,
  /\bbook now\b/i,
  /\blimited spots?\b/i,
];

test("public copy follows the Hangin voice", async () => {
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    const metadata = tags(html, "meta").map((tag) => attribute(tag, "content")).filter(Boolean);
    const altText = tags(html, "img").map((tag) => attribute(tag, "alt")).filter(Boolean);
    const copy = [visibleText(html), ...metadata, ...altText, JSON.stringify(jsonLdBlocks(html))].join(" ");
    for (const pattern of banned) assert.doesNotMatch(copy, pattern, `${route}: ${pattern}`);
  }
});

test("every local link resolves in the static export", async () => {
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    const hrefs = tags(html, "a").map((tag) => attribute(tag, "href")).filter(Boolean);
    for (const href of hrefs) {
      if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/#")) continue;
      const clean = href.split("#")[0].split("?")[0];
      const target = clean === "/" ? path.join(outDir, "index.html") : path.join(outDir, clean.replace(/^\//, ""), "index.html");
      await access(target);
    }
  }
});

test("images have explicit dimensions and alt attributes", async () => {
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    for (const image of tags(html, "img")) {
      assert.ok(attribute(image, "src"), `${route} image src`);
      assert.ok(attribute(image, "width"), `${route} image width`);
      assert.ok(attribute(image, "height"), `${route} image height`);
      assert.notEqual(attribute(image, "alt"), undefined, `${route} image alt`);
    }
  }
});
