import assert from "node:assert/strict";
import test from "node:test";
import { readRoute, visibleText } from "./export-helpers.mjs";

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
