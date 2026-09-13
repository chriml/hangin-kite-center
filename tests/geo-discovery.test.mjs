import assert from "node:assert/strict";
import test from "node:test";
import { attribute, jsonLdBlocks, publicRoutes, readRoute, tags, visibleText } from "./export-helpers.mjs";

const placeId = "ChIJDZwPzD08pTMRCv8c2mLjjBw";

test("business map links and structured location resolve to the same verified place", async () => {
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    const graph = jsonLdBlocks(html).flatMap(block => block["@graph"] ?? [block]);
    const location = graph.find(item => item["@type"] === "SportsActivityLocation");
    assert.ok(location?.hasMap, `${route} has a map identity`);
    assert.equal(new URL(location.hasMap).searchParams.get("query_place_id"), placeId);
    const mapLinks = tags(html, "a").map(tag => attribute(tag, "href")).filter(href => href?.startsWith("https://www.google.com/maps/"));
    for (const href of mapLinks) assert.equal(href, location.hasMap, `${route} map identity differs from visible links`);
  }
});

test("lesson answers retain approved prices and teaching hours in visible HTML and matching structured data", async () => {
  const html = await readRoute("/kitesurfing-lessons/");
  const faq = jsonLdBlocks(html).find(block => block["@type"] === "FAQPage");
  const cost = faq.mainEntity.find(item => /How much.*lessons/i.test(item.name));
  const duration = faq.mainEntity.find(item => /How many days/i.test(item.name));
  assert.ok(cost, "a direct cost answer is available");
  assert.ok(duration, "teaching time is distinguished from calendar days");
  assert.match(cost.acceptedAnswer.text, /PHP 6,000/);
  assert.match(cost.acceptedAnswer.text, /PHP 36,000/);
  assert.match(duration.acceptedAnswer.text, /9 hours.*12 hours/);
  assert.match(duration.acceptedAnswer.text, /not a fixed number of days/);
  const text = visibleText(html);
  for (const question of faq.mainEntity) {
    assert.ok(text.includes(question.name));
    assert.ok(text.includes(question.acceptedAnswer.text), `hidden or mismatched answer: ${question.name}`);
  }
});
