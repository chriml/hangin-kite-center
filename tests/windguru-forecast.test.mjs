import assert from "node:assert/strict";
import test from "node:test";
import { attribute, readRoute, tags, visibleText } from "./export-helpers.mjs";

for (const route of ["/kitesurfing-boracay/", "/kite-size-guide/"]) {
  test(`${route} renders the Hangin forecast without a load control`, async () => {
    const html = await readRoute(route);
    assert.match(visibleText(html), /Windguru forecast for Bulabog/);
    assert.doesNotMatch(visibleText(html), /(?:Load|Hide) Windguru forecast|Windguru receives your IP address|Wind and gusts in knots, at Windguru/);
    const frames = tags(html, "iframe").filter(tag => attribute(tag, "src")?.startsWith("https://www.windguru.cz/widget-fcst-iframe.php?"));
    assert.equal(frames.length, 1);
    const src = new URL(attribute(frames[0], "src"));
    assert.equal(src.searchParams.get("s"), "1280920");
    assert.equal(src.searchParams.get("m"), "3");
    assert.equal(attribute(frames[0], "loading"), "eager");
    assert.equal(attribute(frames[0], "sandbox"), "allow-scripts allow-same-origin");
    const links = tags(html, "a").map(tag => attribute(tag, "href"));
    assert.ok(links.includes("https://www.windguru.cz/1280920"));
    assert.ok(links.some(href => href?.startsWith("https://wa.me/639380101849")));
  });
}

test("the Boracay submenu links to a focusable forecast heading from parent and child pages", async () => {
  for (const route of ["/kitesurfing-boracay/", "/kitesurfing-boracay/places-to-be/"]) {
    assert.ok(tags(await readRoute(route), "a").some(tag => attribute(tag, "href") === "/kitesurfing-boracay/#windguru-heading"));
  }
  const html = await readRoute("/kitesurfing-boracay/");
  const heading = tags(html, "h2").find(tag => attribute(tag, "id") === "windguru-heading");
  assert.equal(attribute(heading, "tabindex"), "-1");
});
