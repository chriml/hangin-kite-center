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
  publicRoutes,
  readRoute,
  tags,
  title,
} from "./export-helpers.mjs";

const contactMessages = {
  complaint: "Hi Hangin, I'd like to raise a complaint about a service or item.",
  general:
    "Hi Hangin, I'm planning a Boracay trip. My dates are [dates], my riding level is [level], and I need help with [service].",
  lessons: "Hi Hangin, I'd like to arrange kitesurfing lessons in Boracay.",
  rental:
    "Hi Hangin, I'd like to check kite rental availability for my Boracay trip.",
  "rental-storage":
    "Hi Hangin, I'd like to ask about kite rental or gear storage for my Boracay trip. My dates are [dates], my riding level is [level], and my usual sizes are [sizes].",
  storage: "Hi Hangin, I'd like to ask about kite storage on Bulabog Beach.",
  safari: "Hi Hangin, I'd like to ask about a kite safari from Boracay. My dates are [dates], our riding levels are [levels], our group size is [number], and we're bringing [gear]. What could work, what does it cost, and what's included?",
  stay: "Hi Hangin, I'd like to check accommodation availability near the kite beach.",
  shop: "Hi Hangin, I'd like to check what kite gear is currently in the shop.",
};

test("every primary contact action keeps the current destination and page context", async () => {
  const courseMessages = new Set(
    ["Introductory course", "Basic kite course", "Kite control course", "Board riding course", "Full course", "Advanced private coaching"]
      .map((course) => `Hi Hangin, I'd like to ask about ${course} in Boracay. My dates are [dates] and my riding level is [level].`),
  );
  const safariMessages = new Set(["Batbatan", "Colon", "Others"].map(trip =>
    `Hi Hangin, I'd like to request information about the ${trip} kite safari. My dates are [dates] and my riding level is [level].`));
  const expectedMessages = new Set([
    contactMessages.general,
    contactMessages.complaint,
    contactMessages.lessons,
    contactMessages.rental,
    contactMessages.storage,
    contactMessages["rental-storage"],
    contactMessages.safari,
    contactMessages.stay,
    contactMessages.shop,
    ...courseMessages,
    ...safariMessages,
  ]);
  const seenMessages = new Set();

  for (const route of publicRoutes) {
    const html = await readRoute(route);
    const hrefs = tags(html, "a")
      .map((tag) => attribute(tag, "href"))
      .filter((href) => href?.startsWith("https://wa.me/"));
    assert.ok(hrefs.length >= 1, `${route} primary contact action`);

    for (const href of hrefs) {
      const decodedHref = href.replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&");
      const url = new URL(decodedHref);
      const message = url.searchParams.get("text");
      assert.equal(url.origin, "https://wa.me");
      assert.equal(url.pathname, "/639380101849");
      assert.ok(expectedMessages.has(message), `${route} unexpected contact context`);
      if (safariMessages.has(message)) {
        assert.equal(route, "/kite-safaris/", "trip requests belong on the safari listing");
      }
      if (courseMessages.has(message)) {
        assert.equal(route, "/kitesurfing-lessons/", "course enquiries belong on the lessons page");
      }
      if (message === contactMessages.rental || message === contactMessages.storage) {
        assert.equal(route, "/rentals-storage/", "specific rental/storage enquiries belong on their service page");
      }
      seenMessages.add(message);
    }
  }

  assert.deepEqual(seenMessages, expectedMessages);
});

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
