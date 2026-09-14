import assert from "node:assert/strict";
import test from "node:test";
import { attribute, readRoute, tags, visibleText } from "./export-helpers.mjs";

test("practical Boracay answers expose the sources used for place and activity claims", async () => {
  const html = await readRoute("/kitesurfing-boracay/practical-questions/");
  const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0];
  const sources = main?.match(/<p\b[^>]*>\s*<span>Further reading<\/span>[\s\S]*?<\/p>/i)?.[0];

  assert.ok(main, "missing main content");
  assert.ok(sources, "missing Further reading sources");
  assert.match(visibleText(sources), /^Further reading /);
  assert.deepEqual(
    tags(sources, "a")
      .map(link => attribute(link, "href"))
      .filter(href => href?.startsWith("https://")),
    [
      "https://www.tourismphilippines.com.au/where/boracay",
      "https://app.philippines.travel/articles/discover-diniwid-and-boracay-s-quiet-getaways",
    ],
  );
});

test("the About contact answer states what to send and the confirmed reply time", async () => {
  const html = await readRoute("/about/");
  const mainText = visibleText(html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] ?? "");

  assert.match(mainText, /Send your Boracay dates, riding level and what you need/i);
  assert.match(mainText, /reply within one day/i);
});
