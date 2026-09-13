import assert from "node:assert/strict";
import test from "node:test";
import { attribute, jsonLdBlocks, linkHref, metaContent, readRoute, tags, visibleText } from "./export-helpers.mjs";

const trips = [["batbatan", "Batbatan"], ["colon", "Colon"], ["others", "Others"]];

test("safari cards replace the planning strip and link each trip to its own page and enquiry", async () => {
  const html = await readRoute("/kite-safaris/");
  assert.doesNotMatch(html, /aria-label="Safari planning"|id="safari-routes"|id="safari-level"|id="safari-gear"/);
  const cards = html.match(/<article\b[^>]*data-safari-trip[^>]*>[\s\S]*?<\/article>/g) ?? [];
  assert.equal(cards.length, 3);
  for (const [index, [slug, name]] of trips.entries()) {
    const card = cards[index];
    assert.equal(attribute(tags(card, "article")[0], "data-safari-trip"), slug);
    assert.match(visibleText(card), new RegExp(name));
    const links = tags(card, "a");
    assert.equal(links.length, 2);
    const more = links.find(a => attribute(a, "href") === `/kite-safaris/${slug}/`);
    assert.ok(more, `${name}: More opens its detail page`);
    const request = links.find(a => attribute(a, "href")?.startsWith("https://wa.me/"));
    assert.ok(request, `${name}: Request opens WhatsApp`);
    const url = new URL(attribute(request, "href").replaceAll("&amp;", "&").replaceAll("&#x27;", "'"));
    assert.equal(url.pathname, "/639380101849");
    assert.equal(url.searchParams.get("text"), `Hi Hangin, I'd like to request information about the ${name} kite safari. My dates are [dates] and my riding level is [level].`);
    assert.equal(attribute(request, "target"), "_blank");
    assert.equal(attribute(request, "rel"), "noopener noreferrer");
  }
});

test("each safari exports a coming-soon page with matching breadcrumbs and no invented trip offer", async () => {
  for (const [slug, name] of trips) {
    const route = `/kite-safaris/${slug}/`;
    const html = await readRoute(route);
    const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0] ?? "";
    assert.equal(tags(main, "h1").length, 1);
    assert.match(visibleText(main), new RegExp(`${name}.*Coming soon`));
    assert.equal(linkHref(html, "canonical"), `https://www.hanginkitecenter.com${route}`);
    assert.equal(metaContent(html, "name", "robots"), "noindex, follow");
    const crumbs = jsonLdBlocks(html).find(block => block["@type"] === "BreadcrumbList");
    assert.deepEqual(crumbs.itemListElement.map(item => item.item), [
      "https://www.hanginkitecenter.com/",
      "https://www.hanginkitecenter.com/kite-safaris/",
      `https://www.hanginkitecenter.com${route}`,
    ]);
    assert.doesNotMatch(JSON.stringify(jsonLdBlocks(html)), /"(?:Offer|price|availability|TouristTrip)"/);
    assert.ok(tags(main, "a").some(a => attribute(a, "href") === "/kite-safaris/"));
  }
});
