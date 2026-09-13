import assert from "node:assert/strict";
import test from "node:test";
import { attribute, jsonLdBlocks, readRoute, tags, visibleText } from "./export-helpers.mjs";

const base = "/kitesurfing-boracay/";
const pages = [
  { route: `${base}places-to-be/`, section: "places", entry: "bulabog-beach" },
  { route: `${base}things-to-do/`, section: "activities", entry: "learn-to-kite" },
  { route: `${base}planning-your-days/`, section: "planning", entry: "getting-around" },
  { route: `${base}practical-questions/`, section: "questions" },
];

test("Boracay subpages export a shared hero and one menu linking distinct pages", async () => {
  for (const route of [base, ...pages.map(page => page.route)]) {
    const html = await readRoute(route);
    assert.equal(tags(html, "main").length, 1, `${route} main landmark`);
    assert.equal(tags(html, "h1").length, 1, `${route} shared heading`);
    assert.match(html, /<h1>Kitesurfing on Boracay<\/h1>/);
    const breadcrumbs = html.match(/<nav aria-label="Breadcrumb">[\s\S]*?<\/nav>/g) ?? [];
    assert.equal(breadcrumbs.length, 1, `${route} has one top breadcrumb`);
    assert.ok(html.indexOf(breadcrumbs[0]) < html.indexOf("<h1>"), `${route} breadcrumb precedes the hero`);
    const nav = html.match(/<nav\b[^>]*aria-label="Explore Boracay"[^>]*>[\s\S]*?<\/nav>/)?.[0];
    assert.ok(nav, `${route} submenu`);
    const links = tags(nav, "a");
    assert.deepEqual(links.map(link => attribute(link, "href")), [base, ...pages.map(page => page.route), "/kite-safaris/"]);
    assert.equal(tags(nav, "ul").length, 1, `${route} has one flat menu`);
    assert.deepEqual(links.filter(link => attribute(link, "aria-current") === "page").map(link => attribute(link, "href")), [route]);
    assert.doesNotMatch(nav, /href="#|aria-current="location"/);
    assert.match(nav, /Kite safaris <span aria-hidden="true">↗<\/span>/);
  }
});

test("each Boracay subpage contains only its own guide content and matching breadcrumbs", async () => {
  for (const page of pages) {
    const html = await readRoute(page.route);
    assert.match(html, new RegExp(`id="${page.section}"`));
    if (page.entry) assert.match(html, new RegExp(`id="${page.entry}"`));
    else assert.equal(tags(html, "details").filter(tag => !attribute(tag, "class")).length, 3);
    for (const other of pages.filter(other => other !== page)) {
      assert.doesNotMatch(html, new RegExp(`id="${other.section}"`), `${page.route} does not embed ${other.section}`);
    }
    const breadcrumb = html.match(/<nav aria-label="Breadcrumb">[\s\S]*?<\/nav>/)?.[0];
    const blocks = jsonLdBlocks(html);
    const items = blocks.find(block => block["@type"] === "BreadcrumbList")?.itemListElement;
    assert.deepEqual(items?.map(({ position, item }) => [position, new URL(item).pathname]), [[1, "/"], [2, base], [3, page.route]]);
    for (const item of items) assert.ok(visibleText(breadcrumb).includes(item.name));
    assert.doesNotMatch(JSON.stringify(blocks), /"(?:Service|Offer|AggregateRating|Review|FAQPage)"/);
    assert.ok(tags(html, "a").some(tag => attribute(tag, "href")?.startsWith("https://wa.me/")));
  }
});

test("the spot guide teaser links directly to the separate guide pages", async () => {
  const html = await readRoute(base);
  const section = html.match(/<section\b[^>]*id="places-to-be"[^>]*>[\s\S]*?<\/section>/i)?.[0];
  assert.ok(section, "missing places section");
  const links = tags(section, "a").map(tag => attribute(tag, "href"));
  for (const page of pages.slice(0, 3)) assert.ok(links.includes(page.route), page.route);
  assert.ok(links.every(href => !href.includes("#")));
});
