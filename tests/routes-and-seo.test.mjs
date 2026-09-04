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
    assert.equal(metaContent(html, "name", "robots"), "index, follow");
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

test("sitemap and robots cover the exact public surface", async () => {
  const sitemap = await readFile(path.join(outDir, "sitemap.xml"), "utf8");
  const robots = await readFile(path.join(outDir, "robots.txt"), "utf8");
  const entries = sitemapEntries(sitemap);

  assert.deepEqual(
    entries.map((entry) => entry.url),
    publicRoutes.map((route) => new URL(route, origin).toString()),
  );
  for (const [index, entry] of entries.entries()) {
    const route = publicRoutes[index];
    assert.equal(entry.lastModified, "2026-09-04T00:00:00.000Z", `${route} lastModified`);
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
  const seen = new Set();

  for (const route of publicRoutes) {
    const html = await readRoute(route);
    const anchors = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? [];
    for (const anchor of anchors) {
      const label = visibleText(anchor);
      if (!expectedLicenses.has(label)) continue;
      seen.add(label);
      assert.equal(attribute(anchor, "href"), expectedLicenses.get(label), `${route} ${label}`);
    }
  }

  assert.deepEqual(seen, new Set(expectedLicenses.keys()));
});

test("the Boracay riders proof photo has an honest pixel-level alt description", async () => {
  const expectedAlt = "Riders kitesurfing together over turquoise Boracay water";
  let count = 0;

  for (const route of publicRoutes) {
    for (const image of tags(await readRoute(route), "img")) {
      const source = attribute(image, "src") ?? "";
      if (!source.includes("boracay-kitesurf-school")) continue;
      count += 1;
      assert.equal(attribute(image, "alt"), expectedAlt, route);
    }
  }

  assert.ok(count >= 2, "expected the riders proof photo on the homepage and lessons page");
});

const waterRoutes = [
  ["/kitesurfing-lessons/", /Learn to kitesurf in Boracay/, /Your first lesson starts on the beach/],
  ["/rentals-storage/", /Rent kite gear on Bulabog Beach/, /Store your gear by the spot/],
  ["/kite-safaris/", /Kite safaris from Boracay/, /Routes follow the wind/],
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
  ["/kitesurfing-boracay/", /Kitesurfing on Boracay/, /The kite side of the island/],
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

test("rental and storage CTAs carry both service intents", async () => {
  const html = await readRoute("/rentals-storage/");
  const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] ?? "";
  const messages = tags(main, "a")
    .map((tag) => attribute(tag, "href"))
    .filter((href) => href?.startsWith("https://wa.me/"))
    .map((href) => decodeURIComponent(href.split("?text=")[1] ?? ""));

  assert.ok(messages.length >= 2, "missing rental/storage page CTAs");
  for (const message of messages) {
    assert.match(message, /rental/i);
    assert.match(message, /storage/i);
  }
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
  for (const id of ["start", "choose", "boracay", "services", "story", "questions", "contact"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(text, /Welcome to Hangin Kite Center\./);
  assert.match(text, /Kitesurfing here since 2002\./);
  assert.match(text, /What brings you to Bulabog\?/);
  assert.match(text, /Leave the board bag at home\./);
  assert.match(text, /Tell us when you're coming\./);
  assert.doesNotMatch(text, /book now|limited|don't miss|once-in-a-lifetime/i);
});

test("homepage gives beginners and experienced riders equal first choices", async () => {
  const html = await readRoute("/");
  const choices = html.match(
    /<section\b[^>]*id=["']choose["'][^>]*>[\s\S]*?<\/section>/i,
  )?.[0];
  assert.ok(choices, "missing guest choice section");

  const headings = [...choices.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi)].map(
    (match) => visibleText(match[1]),
  );
  assert.deepEqual(headings, [
    "Learn to kitesurf",
    "Sort out your gear",
    "Stay by the spot",
    "Ask about a kite safari",
  ]);

  const paths = [...choices.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)]
    .filter((match) => /<h3\b/i.test(match[2]))
    .map((match) => [visibleText(match[2].match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/i)[1]), attribute(`<a ${match[1]}>`, "href")]);
  assert.deepEqual(paths, [
    ["Learn to kitesurf", "/kitesurfing-lessons/"],
    ["Sort out your gear", "/rentals-storage/"],
    ["Stay by the spot", "/accommodation/"],
    ["Ask about a kite safari", "/kite-safaris/"],
  ]);
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
  const coralRule = css.match(/\.button--coral\{([^}]*)\}/)?.[1] ?? "";
  const focusRule = css.match(/:focus-visible\{([^}]*)\}/)?.[1] ?? "";

  assert.match(coralRule, /color:var\(--ink\)/);
  assert.ok(contrast(ink, coral) >= 4.5, "coral action text must reach 4.5:1");
  assert.match(focusRule, /outline:[^;]*var\(--sun\)/);
  assert.match(focusRule, /box-shadow:[^}]*var\(--ocean\)/);
  assert.ok(contrast(sun, ocean) >= 3, "inner focus ring must show on ocean");
  assert.ok(contrast(ocean, sand) >= 3, "outer focus ring must show on sand");
});
