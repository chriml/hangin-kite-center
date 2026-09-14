import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { parseSrcset } from "srcset";
import { attribute, outDir, readRoute, tags } from "./export-helpers.mjs";

const responsiveHeroImages = [
  {
    route: "/kitesurfing-lessons/",
    src: "/images/owner/two-smiling-people-with-kite-control-bar-in-shallows.webp",
    candidate: "/images/owner/two-smiling-people-with-kite-control-bar-in-shallows-1200.webp",
  },
  {
    route: "/kite-safaris/",
    src: "/images/generated/kite-safari-sunprint.webp",
    candidate: "/images/generated/kite-safari-sunprint-1200.webp",
  },
  {
    route: "/accommodation/",
    src: "/images/generated/island-stay-sunprint.webp",
    candidate: "/images/generated/island-stay-sunprint-1200.webp",
  },
  {
    route: "/kitesurfing-boracay/",
    src: "/images/owner/colorful-kites-above-bay-and-green-hillside.webp",
    candidate: "/images/owner/colorful-kites-above-bay-and-green-hillside-1200.webp",
  },
  {
    route: "/about/",
    src: "/images/owner/group-portrait-outside-hangin-kite-center.webp",
    candidate: "/images/owner/group-portrait-outside-hangin-kite-center-1200.webp",
  },
];

test("large hero images provide an intermediate candidate for high-density phones", async () => {
  const attribution = await readFile("public/images/ATTRIBUTION.md", "utf8");

  for (const { route, src, candidate } of responsiveHeroImages) {
    const html = await readRoute(route);
    const hero = tags(html, "img").find((image) => attribute(image, "src") === src);
    assert.ok(hero, `${route} hero image`);
    assert.equal(attribute(hero, "loading"), "eager", `${route} hero loading`);
    assert.equal(attribute(hero, "fetchpriority"), "high", `${route} hero priority`);

    const candidates = parseSrcset(attribute(hero, "srcset") ?? "", { strict: true });
    assert.ok(
      candidates.some((item) => item.url === candidate && item.width === 1200),
      `${route} 1200px hero candidate`,
    );

    const relativeCandidate = candidate.replace(/^\//, "");
    const relativeSource = src.replace(/^\//, "");
    assert.match(attribution, new RegExp(relativeCandidate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    await Promise.all([
      access(path.join("public", relativeCandidate)),
      access(path.join(outDir, relativeCandidate)),
    ]);
    const [candidateInfo, sourceInfo] = await Promise.all([
      stat(path.join("public", relativeCandidate)),
      stat(path.join("public", relativeSource)),
    ]);
    assert.ok(candidateInfo.size < sourceInfo.size, `${route} intermediate image is smaller than full source`);
  }
});
