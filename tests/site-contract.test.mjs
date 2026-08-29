import assert from "node:assert/strict";
import test from "node:test";
import {
  jsonLdBlocks,
  linkHref,
  metaContent,
  readRoute,
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

test("homepage JSON-LD contains only confirmed business types", async () => {
  const html = await readRoute("/");
  const blocks = jsonLdBlocks(html);
  const serialized = JSON.stringify(blocks);
  assert.match(serialized, /SportsActivityLocation/);
  assert.match(serialized, /Organization/);
  assert.match(serialized, /WebSite/);
  assert.doesNotMatch(serialized, /AggregateRating|Review|price|openingHours/);
});
