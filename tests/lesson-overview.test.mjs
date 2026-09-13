import assert from "node:assert/strict";
import test from "node:test";
import { attribute, readRoute, tags, visibleText } from "./export-helpers.mjs";

test("course detail pricing preserves every approved price and teaching duration", async () => {
  const html = await readRoute("/kitesurfing-lessons/");
  const courses = new Map([...html.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)]
    .map(([, content]) => [attribute(tags(content, "h2")[0], "id"), content]));
  const expected = [
    ["introductory-course", "6,000", "1.5", "2"],
    ["basic-kite-course", "12,000", "3", "4"],
    ["kite-control-course", "12,000", "3", "4"],
    ["board-riding-course", "12,000", "3", "4"],
    ["full-course", "36,000", "9", "12"],
  ];
  for (const [id, price, privateHours, groupHours] of expected) {
    const pricing = courses.get(id)?.match(/<dl\b[^>]*>([\s\S]*?)<\/dl>/)?.[1];
    assert.ok(pricing, `${id} pricing is available as static labeled facts`);
    assert.equal(visibleText(pricing), `Per person PHP ${price} Private ${privateHours} hours Group ${groupHours} hours`);
  }
  const advanced = courses.get("advanced-private-coaching")?.match(/<dl\b[^>]*>([\s\S]*?)<\/dl>/)?.[1];
  assert.ok(advanced);
  assert.equal(visibleText(advanced), "1 hour private PHP 4,400 2 hours private PHP 8,500 4 hours private PHP 16,000");
});

test("lesson overview exports approved prices and working course jump links", async () => {
  const html = await readRoute("/kitesurfing-lessons/");
  const overview = html.match(/<section\b[^>]*aria-labelledby="course-overview"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(overview, "overview is available without JavaScript");
  const rows = [...overview.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((match) => visibleText(match[1]));
  assert.equal(rows.length, 5);
  const expected = [
    ["Introductory course", "1.5", "2", "6,000"],
    ["Basic kite course", "3", "4", "12,000"],
    ["Kite control course", "3", "4", "12,000"],
    ["Board riding course", "3", "4", "12,000"],
    ["Full course", "9", "12", "36,000"],
  ];
  expected.forEach(([name, privateHours, groupHours, price], index) => {
    assert.ok(rows[index].startsWith(name));
    assert.ok(rows[index].includes(`Private ${privateHours} hours Group ${groupHours} hours Per person PHP ${price}`));
  });
  assert.match(visibleText(overview), /Advanced private coaching.*1 hour PHP 4,400 2 hours PHP 8,500 4 hours PHP 16,000/);
  const links = tags(overview, "a").filter((link) => attribute(link, "href")?.startsWith("#"));
  assert.equal(links.length, 6);
  assert.ok(!visibleText(overview).includes("↓"), "course links have no arrow labels");
  for (const link of links) {
    const href = attribute(link, "href");
    const target = tags(html, "h2").find((heading) => `#${attribute(heading, "id")}` === href);
    assert.ok(target, `course destination lands on its heading for ${href}`);
    assert.equal(attribute(target, "tabindex"), "-1", "course destination accepts keyboard focus");
  }
});

test("each course enquiry carries the selected course, dates and riding level into WhatsApp", async () => {
  const html = await readRoute("/kitesurfing-lessons/");
  const overview = html.match(/<section\b[^>]*aria-labelledby="course-overview"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(overview);
  const courses = ["Introductory course", "Basic kite course", "Kite control course", "Board riding course", "Full course", "Advanced private coaching"];
  const links = tags(overview, "a").filter((link) => attribute(link, "href")?.startsWith("https://wa.me/"));
  assert.equal(links.length, courses.length, "every comparison course has a static enquiry link");
  assert.equal([...overview.matchAll(/<a\b[^>]*href="https:\/\/wa\.me\/[^"]*"[^>]*>([\s\S]*?)<\/a>/g)].filter(([, content]) => visibleText(content) === "Book").length, courses.length);
  for (const [index, link] of links.entries()) {
    const href = attribute(link, "href").replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&");
    const url = new URL(href);
    assert.equal(url.pathname, "/639380101849");
    assert.equal(url.searchParams.get("text"), `Hi Hangin, I'd like to ask about ${courses[index]} in Boracay. My dates are [dates] and my riding level is [level].`);
    assert.equal(attribute(link, "aria-label"), `Book ${courses[index]} via WhatsApp`);
    assert.equal(attribute(link, "target"), "_blank");
    assert.equal(attribute(link, "rel"), "noopener noreferrer");
  }
});
