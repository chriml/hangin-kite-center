import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  attribute,
  jsonLdBlocks,
  outDir,
  readRoute,
  tags,
  visibleText,
} from "./export-helpers.mjs";

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

test("homepage follows the approved calm funnel", async () => {
  const html = await readRoute("/");
  const text = visibleText(html);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  for (const id of ["start", "lessons", "boracay", "services", "story", "questions", "contact"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(text, /Kitesurfing here since 2002\./);
  assert.match(text, /Your first kite lesson/);
  assert.match(text, /Leave the board bag at home\./);
  assert.match(text, /Tell us when you're coming\./);
  assert.doesNotMatch(text, /book now|limited|don't miss|once-in-a-lifetime/i);
});

test("homepage service paths expose real headings", async () => {
  const html = await readRoute("/");
  const lessons = html.match(
    /<section\b[^>]*id=["']lessons["'][^>]*>[\s\S]*?<\/section>/i,
  )?.[0];
  assert.ok(lessons, "missing lessons section");

  const headings = [...lessons.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi)].map(
    (match) => visibleText(match[1]),
  );
  assert.deepEqual(headings, [
    "Your first kite lesson",
    "Board starts and first rides",
    "Progression sessions",
    "Full equipment rental",
  ]);
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
