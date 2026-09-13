import assert from "node:assert/strict";
import test from "node:test";
import { readRoute, tags, visibleText } from "./export-helpers.mjs";

test("lessons proceed from course details through safety to practical questions without the removed video section", async () => {
  const html = await readRoute("/kitesurfing-lessons/");
  assert.equal(tags(html, "video").length, 0);
  assert.doesNotMatch(html, /beach-practice-heading|Before the board hits the water/);
  const headings = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map(([, heading]) => visibleText(heading));
  const conditions = headings.indexOf("Sessions follow the conditions");
  assert.ok(conditions >= 0);
  assert.deepEqual(headings.slice(conditions + 1, conditions + 3), ["Before your lesson", "Practical questions."]);
});
