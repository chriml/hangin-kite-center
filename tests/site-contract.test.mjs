import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  attribute,
  jsonLdBlocks,
  linkHref,
  metaContent,
  outDir,
  readRoute,
  tags,
  title,
} from "./export-helpers.mjs";

test("homepage exports the canonical business identity", async () => {
  const html = await readRoute("/");
  assert.equal(title(html), "Kitesurfing in Boracay | Hangin Kite Center");
  assert.equal(linkHref(html, "canonical"), "https://www.hanginkitecenter.com/");
  assert.match(metaContent(html, "name", "description") ?? "", /Bulabog Beach/i);
});

test("homepage exposes WhatsApp and email without a form", async () => {
  const html = await readRoute("/");
  assert.match(html, /https:\/\/wa\.me\/639380101849\?text=/);
  assert.match(html, /mailto:hanginkitecenter@gmail\.com/);
  assert.doesNotMatch(html, /<form\b/i);
});

test("homepage shell is semantic and usable without client JavaScript", async () => {
  const html = await readRoute("/");
  assert.match(html, /href="#main-content"[^>]*>Skip to content/i);
  assert.match(html, /<main[^>]+id="main-content"/i);
  assert.match(html, /<header\b/i);
  assert.match(html, /<nav[^>]+aria-label="Primary"/i);
  assert.match(html, /<footer\b/i);
  assert.match(html, /<details\b/i);
  assert.doesNotMatch(html, /data-next-hide-fouc|aria-label="Open menu"/i);
});

test("homepage JSON-LD contains only confirmed business types", async () => {
  const html = await readRoute("/");
  const blocks = jsonLdBlocks(html);
  const serialized = JSON.stringify(blocks);
  assert.match(serialized, /SportsActivityLocation/);
  assert.match(serialized, /Organization/);
  assert.match(serialized, /WebSite/);
  assert.doesNotMatch(serialized, /AggregateRating|Review|price|openingHours/);
  assert.doesNotMatch(serialized, /"sport":/);

  const graph = blocks.flatMap((block) => block["@graph"] ?? [block]);
  const website = graph.find((item) => item["@type"] === "WebSite");
  const organization = graph.find((item) => item["@type"] === "Organization");
  const location = graph.find((item) => item["@type"] === "SportsActivityLocation");
  assert.ok(website && organization && location);
  assert.equal(location.telephone, "+639380101849");
  assert.equal(organization["@id"], location["@id"]);
  assert.deepEqual(website.publisher, { "@id": location["@id"] });
});

test("declared local social images resolve in the static export", async () => {
  const html = await readRoute("/");
  const origin = "https://www.hanginkitecenter.com";
  const localImagePaths = tags(html, "meta")
    .filter((tag) => {
      const property = attribute(tag, "property");
      const name = attribute(tag, "name");
      return property === "og:image" || name === "twitter:image";
    })
    .map((tag) => attribute(tag, "content"))
    .filter((content) => content !== undefined)
    .map((content) => new URL(content, origin))
    .filter((url) => url.origin === origin)
    .map((url) => url.pathname);

  await Promise.all(
    localImagePaths.map((imagePath) =>
      access(path.join(outDir, imagePath.replace(/^\//, ""))),
    ),
  );
});
