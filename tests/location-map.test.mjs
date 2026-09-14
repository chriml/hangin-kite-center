import assert from "node:assert/strict";
import test from "node:test";
import { attribute, readRoute, tags, visibleText } from "./export-helpers.mjs";

for (const route of ["/contact/", "/about/"]) {
  test(`${route} renders Hangin's pinned map without a load control`, async () => {
    const html = await readRoute(route);
    const frames = tags(html, "iframe").filter(tag => attribute(tag, "src")?.startsWith("https://www.google.com/maps/embed?"));
    assert.equal(frames.length, 1);
    assert.match(attribute(frames[0], "src"), /0x33a53c3dcc0f9c0d/);
    assert.equal(attribute(frames[0], "loading"), "eager");
    assert.equal(attribute(frames[0], "referrerpolicy"), "no-referrer");
    assert.doesNotMatch(visibleText(html), /(?:Load|Hide) Google Maps|Google receives your IP address/);
    assert.ok(tags(html, "a").some(tag => attribute(tag, "href")?.startsWith("https://wa.me/639380101849")));
  });
}

test("About location shows the confirmed address without the removed directions copy", async () => {
  const html = await readRoute("/about/");
  assert.match(visibleText(html), /Hangin Kite Center Bulabog Beach, Boracay, Philippines/);
  assert.doesNotMatch(visibleText(html), /Confirm your lesson meeting point|Open Google Maps/);
});

test("Boracay keeps the forecast without the relocated address and map section", async () => {
  const html = await readRoute("/kitesurfing-boracay/");
  assert.doesNotMatch(html, /id="find-hangin-heading"/);
  assert.equal(tags(html, "iframe").filter(tag => attribute(tag, "src")?.startsWith("https://www.google.com/maps/embed?")).length, 0);
  assert.match(visibleText(html), /Windguru forecast for Bulabog/);
});
