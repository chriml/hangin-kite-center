import assert from "node:assert/strict";
import test from "node:test";
import { attribute, jsonLdBlocks, readRoute, tags, visibleText } from "./export-helpers.mjs";

test("kite guide exports useful content, labelled inputs and a no-JavaScript fallback", async () => {
  const html = await readRoute("/kite-size-guide/");
  const text = visibleText(html);
  assert.match(text, /Boracay kite size guide/i);
  assert.match(text, /60 to 120 kg/);
  assert.match(text, /Airush kite size chart/);
  assert.match(text, /10–13 knots/);
  assert.match(text, /View Hangin.s wind guide by month/);
  assert.match(text, /not measured wind statistics or a forecast/);
  assert.match(text, /December and March.*broad estimates/);
  assert.match(text, /occasionally 35 knots/);
  assert.match(text, /No reliable range/);
  assert.match(html, /<noscript>/);
  for (const id of ["rider-weight", "weight-unit", "arrival-month", "departure-month", "rider-level"]) {
    assert.match(html, new RegExp(`for="${id}"`));
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.doesNotMatch(html, /id="(?:arrival|departure)-year"/);
  for (const input of [...tags(html,"input"),...tags(html,"select")]) {
    assert.equal(attribute(input,"name"), undefined, "rider data is never submitted as URL fields");
  }
  assert.match(html, /<fieldset[^>]*disabled/);
  assert.match(html, /https:\/\/wa\.me\/639380101849/);
  assert.doesNotMatch(JSON.stringify(jsonLdBlocks(html)), /Offer|Product|AggregateRating|SoftwareApplication/);
});

test("kite guide is linked from the homepage spot section", async () => {
  const html = await readRoute("/");
  const spot = html.match(/<section[^>]+id="boracay"[\s\S]*?<\/section>/)?.[0];
  assert.ok(spot);
  assert.match(spot, /href="\/kite-size-guide\/"/);
});
