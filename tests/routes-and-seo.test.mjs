import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  attribute,
  jsonLdBlocks,
  linkHref,
  metaContent,
  outDir,
  publicRoutes,
  pendingSafariRoutes,
  indexableRoutes,
  readRoute,
  tags,
  title,
  visibleText,
} from "./export-helpers.mjs";

const origin = "https://www.hanginkitecenter.com";

function assertSharedSocialImage(content, message) {
  assert.ok(content, `${message} missing`);
  const imageUrl = new URL(content);
  assert.equal(imageUrl.origin, origin, `${message} origin`);
  assert.equal(imageUrl.pathname, "/opengraph-image.jpg", `${message} path`);
}

test("every public route has unique complete metadata and shared social images", async () => {
  const seenTitles = new Set();
  const seenDescriptions = new Set();

  for (const route of publicRoutes) {
    const html = await readRoute(route);
    const pageTitle = title(html);
    const description = metaContent(html, "name", "description");

    assert.ok(pageTitle && pageTitle.length >= 25 && pageTitle.length <= 65, `${route} title`);
    assert.ok(
      (pageTitle.match(/Hangin Kite Center/g) ?? []).length <= 1,
      `${route} repeats the brand in its title`,
    );
    assert.ok(
      description && description.length >= 100 && description.length <= 165,
      `${route} description`,
    );
    assert.ok(!seenTitles.has(pageTitle), `${route} duplicate title`);
    assert.ok(!seenDescriptions.has(description), `${route} duplicate description`);
    seenTitles.add(pageTitle);
    seenDescriptions.add(description);

    assert.equal(linkHref(html, "canonical"), new URL(route, origin).toString());
    assert.equal(metaContent(html, "name", "robots"), pendingSafariRoutes.includes(route) || route === "/events/" ? "noindex, follow" : "index, follow");
    assertSharedSocialImage(
      metaContent(html, "property", "og:image"),
      `${route} Open Graph image`,
    );
    assert.match(
      metaContent(html, "property", "og:image:alt") ?? "",
      /Boracay/i,
      `${route} Open Graph image alt`,
    );
    assertSharedSocialImage(
      metaContent(html, "name", "twitter:image"),
      `${route} Twitter image`,
    );
    assert.match(
      metaContent(html, "name", "twitter:image:alt") ?? "",
      /Boracay/i,
      `${route} Twitter image alt`,
    );
  }
});

function sitemapEntries(xml) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => {
    const value = match[1];
    const element = (name) => value.match(new RegExp(`<${name}>(.*?)<\\/${name}>`))?.[1];
    return {
      url: element("loc"),
      lastModified: element("lastmod"),
      changeFrequency: element("changefreq"),
      priority: Number(element("priority")),
    };
  });
}

test("sitemap covers the exact indexable surface and robots permits crawling", async () => {
  const sitemap = await readFile(path.join(outDir, "sitemap.xml"), "utf8");
  const robots = await readFile(path.join(outDir, "robots.txt"), "utf8");
  const entries = sitemapEntries(sitemap);

  assert.deepEqual(
    entries.map((entry) => entry.url),
    indexableRoutes.map((route) => new URL(route, origin).toString()),
  );
  for (const [index, entry] of entries.entries()) {
    const route = indexableRoutes[index];
    const expectedDate = route === "/kite-safaris/" || route === "/legal/" || route.startsWith("/kitesurfing-boracay/")
      ? "2026-09-13T00:00:00.000Z"
      : route === "/kite-size-guide/"
      ? "2026-09-08T00:00:00.000Z"
      : route === "/terms/" || route === "/accessibility/"
      ? "2026-09-04T00:00:00.000Z"
      : "2026-08-29T00:00:00.000Z";
    assert.equal(entry.lastModified, expectedDate, `${route} lastModified`);
    assert.equal(entry.changeFrequency, route === "/" ? "weekly" : "monthly", `${route} frequency`);
    assert.equal(
      entry.priority,
      route === "/" ? 1 : ["/kitesurfing-lessons/", "/kitesurfing-boracay/"].includes(route) ? 0.9 : 0.7,
      `${route} priority`,
    );
  }

  assert.match(robots, /User-Agent: \*\s+Allow: \//i);
  assert.match(robots, /Sitemap: https:\/\/www\.hanginkitecenter\.com\/sitemap\.xml/i);
  assert.match(robots, /Host: https:\/\/www\.hanginkitecenter\.com/i);
});

test("manifest metadata uses the approved identity, colors, and icons", async () => {
  const manifest = JSON.parse(
    await readFile(path.join(outDir, "manifest.webmanifest"), "utf8"),
  );

  assert.deepEqual(manifest, {
    name: "Hangin Kite Center",
    short_name: "Hangin",
    description: "Kitesurfing lessons, rental, storage, accommodation, shop and kite safaris on Boracay.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf6",
    theme_color: "#073642",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  });
});

test("social and icon assets are exported", async () => {
  await Promise.all([
    access(path.join(outDir, "opengraph-image.jpg")),
    access(path.join(outDir, "icon.svg")),
    access(path.join(outDir, "apple-icon.png")),
  ]);
});

test("proof-image license labels link to the matching license deeds", async () => {
  const expectedLicenses = new Map([
    ["CC0 1.0", "https://creativecommons.org/publicdomain/zero/1.0/"],
    ["CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/"],
    ["CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0/"],
  ]);
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    const anchors = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? [];
    for (const anchor of anchors) {
      const label = visibleText(anchor);
      if (!expectedLicenses.has(label)) continue;
      assert.equal(attribute(anchor, "href"), expectedLicenses.get(label), `${route} ${label}`);
    }
  }

  // Any licensed photograph brought back into use must retain its visible credit.
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    for (const [source, creator, license] of [
      ["bulabog-beach-aerial", "Patrickroque01", "CC BY-SA 4.0"],
      ["boracay-kitesurfing.webp", "Anastasia Zhebyuk", "CC BY-SA 3.0"],
    ]) {
      if (!tags(html, "img").some((image) => attribute(image, "src")?.includes(source))) continue;
      assert.ok(visibleText(html).includes(creator), `${route} missing ${creator} credit`);
      assert.ok(visibleText(html).includes(license), `${route} missing ${license} credit`);
    }
  }
});

test("owner photographs have useful alternatives and do not inherit stock-photo credits", async () => {
  let count = 0;
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    for (const figure of html.match(/<figure\b[^>]*>[\s\S]*?<\/figure>/gi) ?? []) {
      if (!tags(figure, "img").some((image) => attribute(image, "src")?.startsWith("/images/owner/"))) continue;
      assert.doesNotMatch(tags(figure, "figure")[0], /aria-hidden="true"/);
      assert.doesNotMatch(visibleText(figure), /Kstranger|Anastasia Zhebyuk|licensed CC/);
    }
    for (const image of tags(html, "img")) {
      if (!attribute(image, "src")?.startsWith("/images/owner/")) continue;
      count += 1;
      assert.ok((attribute(image, "alt") ?? "").trim().length > 10, `${route} owner photo needs a useful alternative`);
    }
  }
  assert.ok(count > 0, "expected owner photographs on the website");
});

const waterRoutes = [
  ["/kitesurfing-lessons/", /Learn to kitesurf in Boracay/, /Introductory course Per person PHP 6,000 Private 1\.5 hours Group 2 hours/],
  ["/rentals-storage/", /Rent kite gear on Bulabog Beach/, /Store your gear by the spot/],
  ["/kite-safaris/", /Kite safaris from Boracay/, /Batbatan.*Colon.*Others/],
];

for (const [route, heading, proof] of waterRoutes) {
  test(`${route} exports useful service content`, async () => {
    const html = await readRoute(route);
    const text = visibleText(html);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
    assert.match(text, heading);
    assert.match(text, proof);
    assert.match(html, /aria-label="Breadcrumb"/i);
    assert.match(JSON.stringify(jsonLdBlocks(html)), /Service/);
    assert.match(JSON.stringify(jsonLdBlocks(html)), /BreadcrumbList/);
  });
}

const islandRoutes = [
  ["/accommodation/", /Stay close to Boracay's kite beach/, /Wake up, check the water/],
  ["/shop/", /Kite gear and beach essentials in Boracay/, /Ask what is on the rack today/],
  ["/kitesurfing-boracay/", /Kitesurfing on Boracay/, /The reef shelters Bulabog's lagoon/],
  ["/about/", /On the beach since 2002/, /Hangin began as a kite school/],
  ["/contact/", /Tell us when you're coming/, /Your dates and riding level/],
];

for (const [route, heading, proof] of islandRoutes) {
  test(`${route} exports specific local content`, async () => {
    const html = await readRoute(route);
    const text = visibleText(html);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
    assert.match(text, heading);
    assert.match(text, proof);
    assert.match(html, /aria-label="Breadcrumb"/i);
  });
}

test("rental FAQ confirms the service without claiming current availability", async () => {
  const html = await readRoute("/rentals-storage/");
  const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] ?? "";
  const rentalFaq = (main.match(/<details\b[^>]*>[\s\S]*?<\/details>/gi) ?? [])
    .find((block) => visibleText(block).includes("Can I rent a complete kite setup?"));

  assert.ok(rentalFaq, "missing complete kite setup FAQ");
  const answer = visibleText(rentalFaq);
  assert.doesNotMatch(answer, /\b(?:available|availability)\b/i);
  assert.match(answer, /WhatsApp/i);
  assert.match(answer, /dates/i);
  assert.match(answer, /level/i);
  assert.match(answer, /sizes/i);
});

function declaredJsonLdIds(value) {
  if (Array.isArray(value)) return value.flatMap(declaredJsonLdIds);
  if (!value || typeof value !== "object") return [];

  const ownId = typeof value["@id"] === "string" && Object.keys(value).length > 1
    ? [value["@id"]]
    : [];
  return [
    ...ownId,
    ...Object.values(value).flatMap(declaredJsonLdIds),
  ];
}

test("every Service provider resolves to a declared JSON-LD entity", async () => {
  for (const [route] of waterRoutes) {
    const blocks = jsonLdBlocks(await readRoute(route));
    const declaredIds = new Set(declaredJsonLdIds(blocks));
    const services = blocks.filter((block) => block["@type"] === "Service");

    assert.equal(services.length, 1, `${route} Service count`);
    assert.ok(
      declaredIds.has(services[0].provider?.["@id"]),
      `${route} unresolved provider ${services[0].provider?.["@id"]}`,
    );
  }
});

test("the shop does not describe retail stock as a Service", async () => {
  const blocks = jsonLdBlocks(await readRoute("/shop/"));
  assert.equal(
    blocks.filter((block) => block["@type"] === "Service").length,
    0,
  );
});

test("rental page CTAs cover both services and each card has a matching enquiry", async () => {
  const html = await readRoute("/rentals-storage/");
  const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] ?? "";
  const pageContent = main.replace(/<article\b[^>]*>[\s\S]*?<\/article>/gi, "");
  const messages = tags(pageContent, "a")
    .map((tag) => attribute(tag, "href"))
    .filter((href) => href?.startsWith("https://wa.me/"))
    .map((href) => decodeURIComponent(href.split("?text=")[1] ?? ""));

  assert.ok(messages.length >= 2, "missing rental/storage page CTAs");
  for (const message of messages) {
    assert.match(message, /rental/i);
    assert.match(message, /storage/i);
  }
  const cards = main.match(/<article\b[^>]*>[\s\S]*?<\/article>/gi) ?? [];
  const expected = [
    ["Book rental via WhatsApp", "Hi Hangin, I'd like to check kite rental availability for my Boracay trip."],
    ["Book storage via WhatsApp", "Hi Hangin, I'd like to ask about kite storage on Bulabog Beach."],
    ["Plan your setup via WhatsApp", "Hi Hangin, I'd like to ask about kite rental or gear storage for my Boracay trip. My dates are [dates], my riding level is [level], and my usual sizes are [sizes]."],
    ["Check availability via WhatsApp", "Hi Hangin, I'd like to check kite rental availability for my Boracay trip."],
  ];
  assert.equal(cards.length, expected.length);
  cards.forEach((card, index) => {
    const [label, message] = expected[index];
    assert.ok(visibleText(card).includes(label));
    const links = tags(card, "a");
    assert.equal(links.length, 1);
    const url = new URL(attribute(links[0], "href").replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&"));
    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, "/639380101849");
    assert.equal(url.searchParams.get("text"), message);
    assert.equal(attribute(links[0], "target"), "_blank");
    assert.match(attribute(links[0], "rel"), /noopener/);
  });
  const text = visibleText(main);
  assert.match(text, /Ask about rental, storage or both\./);
  assert.match(text, /rent a setup, store your own gear or arrange both/i);
});

function rgb(hex) {
  const value = hex.slice(1);
  const full = value.length === 3 ? [...value].map((item) => item + item).join("") : value;
  return [0, 2, 4].map((offset) => Number.parseInt(full.slice(offset, offset + 2), 16));
}

function luminance(hex) {
  const channels = rgb(hex).map((value) => {
    const channel = value / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(first, second) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

async function exportedCss(html) {
  const hrefs = tags(html, "link")
    .filter((tag) => attribute(tag, "rel") === "stylesheet")
    .map((tag) => attribute(tag, "href"))
    .filter((href) => href !== undefined);
  const files = await Promise.all(
    hrefs.map((href) => readFile(path.join(outDir, href.replace(/^\//, "")), "utf8")),
  );
  return files.join("\n");
}

function colorVariable(css, name) {
  const value = css.match(new RegExp(`${name}:\\s*(#[0-9a-f]{3,6})`, "i"))?.[1];
  assert.ok(value, `missing exported color variable ${name}`);
  return value;
}

test("homepage welcomes every guest and follows the approved calm funnel", async () => {
  const html = await readRoute("/");
  const text = visibleText(html);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  for (const id of ["start", "services", "boracay", "story", "questions", "contact"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(text, /Bulabog Beach, Boracay/);
  assert.match(text, /If the wind is up, we're out there\./);
  assert.doesNotMatch(text, /Welcome to|Out on the water in Boracay/);
  assert.match(text, /Kitesurfing since 2002\./);
  assert.match(text, /Your Boracay kite experience\./);
  assert.match(text, /Ask us anything\./);
  assert.match(text, /We'll get back to you within one day\./);
  assert.doesNotMatch(text, /book now|limited|don't miss|once-in-a-lifetime/i);
});

test("homepage presents each service once before the spot guide", async () => {
  const html = await readRoute("/");
  const choices = html.match(
    /<section\b[^>]*id=["']services["'][^>]*>[\s\S]*?<\/section>/i,
  )?.[0];
  assert.ok(choices, "missing combined service section");
  assert.doesNotMatch(html, /id=["']choose["']/);
  assert.ok(html.indexOf(choices) < html.indexOf('id="boracay"'));

  const headings = [...choices.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi)].map(
    (match) => visibleText(match[1]),
  );
  assert.deepEqual(headings, [
    "Learn to kitesurf",
    "Rent gear or store your own.",
    "Stay close to the kite beach.",
    "Check what is on the rack.",
    "Trips follow the conditions.",
  ]);

  for (const href of [
    "/kitesurfing-lessons/",
    "/rentals-storage/",
    "/accommodation/",
    "/shop/",
    "/kite-safaris/",
  ]) {
    assert.equal((choices.match(new RegExp(`href=["']${href}["']`, "g")) ?? []).length, 1);
  }
});

test("homepage hero keeps WhatsApp as its single action", async () => {
  const html = await readRoute("/");
  const hero = html.match(
    /<section\b[^>]*id=["']start["'][^>]*>[\s\S]*?<\/section>/i,
  )?.[0];
  assert.ok(hero, "missing homepage hero");

  const hrefs = tags(hero, "a")
    .filter((tag) => /class=["'][^"']*button\b/i.test(tag))
    .map((tag) => attribute(tag, "href"))
    .filter((href) => href !== undefined);
  assert.equal(hrefs.length, 1);
  assert.match(hrefs[0], /^https:\/\/wa\.me\/639380101849\?text=/);
});

test("uncertain FAQ details point visitors to WhatsApp", async () => {
  const html = await readRoute("/");
  const details = html.match(/<details\b[^>]*>[\s\S]*?<\/details>/gi) ?? [];

  for (const question of ["When is the kite season?", "Can I rent equipment?"]) {
    const block = details.find((item) => visibleText(item).includes(question));
    assert.ok(block, `missing FAQ question: ${question}`);
    assert.match(visibleText(block), /WhatsApp/i);
  }
});

test("exported action and focus colors meet contrast requirements", async () => {
  const html = await readRoute("/");
  const css = await exportedCss(html);
  const coral = colorVariable(css, "--coral");
  const ink = colorVariable(css, "--ink");
  const sun = colorVariable(css, "--sun");
  const ocean = colorVariable(css, "--ocean");
  const sand = colorVariable(css, "--sand");
  const lagoon = colorVariable(css, "--lagoon");
  const coralRule = css.match(/\.button--coral\{([^}]*)\}/)?.[1] ?? "";
  const focusRule = css.match(/:focus-visible\{([^}]*)\}/)?.[1] ?? "";

  assert.match(coralRule, /color:var\(--ink\)/);
  assert.ok(contrast(ink, coral) >= 4.5, "coral action text must reach 4.5:1");
  assert.ok(contrast(ink, lagoon) >= 4.5, "blue panel body text must reach 4.5:1");
  assert.ok(contrast(ocean, lagoon) >= 4.5, "blue panel headings and credits must reach 4.5:1");
  assert.match(focusRule, /outline:[^;]*var\(--sun\)/);
  assert.match(focusRule, /box-shadow:[^}]*var\(--ocean\)/);
  assert.ok(contrast(sun, ocean) >= 3, "inner focus ring must show on ocean");
  assert.ok(contrast(ocean, sand) >= 3, "outer focus ring must show on sand");
});

test("asset credits are collected on the linked legal page", async () => {
  const legal = await readRoute("/legal/");
  const text = visibleText(legal);
  for (const value of ["Image credits", "Kstranger", "Patrickroque01", "Anastasia Zhebyuk", "CC BY-SA 4.0", "CC BY-SA 3.0", "Barlow", "Manrope", "Tabler", "Paweł Kuna"]) {
    assert.ok(text.includes(value), `legal page missing ${value}`);
  }
  for (const route of publicRoutes) {
    const html = await readRoute(route);
    const footer = html.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/i)?.[0] ?? "";
    assert.match(footer, /href="\/legal\/"/);
    assert.doesNotMatch(footer, /Photo credits|Patrickroque01/);
  }
});
