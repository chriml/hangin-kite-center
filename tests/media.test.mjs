import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const files = [
  "proof/boracay-kitesurf-school.webp",
  "proof/bulabog-beach-aerial.webp",
  "proof/boracay-kitesurfing.webp",
  "generated/kite-gear-sunprint.webp",
  "generated/kite-safari-sunprint.webp",
  "generated/island-stay-sunprint.webp",
];

test("all planned local media exists and is non-empty", async () => {
  for (const file of files) {
    const info = await stat(path.join("public/images", file));
    assert.ok(info.size > 10_000, `${file} is unexpectedly small`);
    assert.ok(info.size < 900_000, `${file} needs more compression`);
  }
});

test("every image has a provenance entry", async () => {
  const attribution = await readFile("public/images/ATTRIBUTION.md", "utf8");
  for (const file of files) assert.match(attribution, new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(attribution, /CC0 1\.0/);
  assert.match(attribution, /CC BY-SA 4\.0/);
  assert.match(attribution, /CC BY-SA 3\.0/);
  assert.match(attribution, /OpenAI ImageGen/);
});
