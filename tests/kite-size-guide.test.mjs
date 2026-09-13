import assert from "node:assert/strict";
import test from "node:test";

import { readFile } from "node:fs/promises";
import ts from "typescript";

// Compile with the installed TypeScript so tests also work on Node 20.
const source = await readFile(new URL("../content/kite-size-guide.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
const guide = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`);
const input = { weight: 75, unit: "kg", arrivalMonth: 1, departureMonth: 1, level: "intermediate" };

test("guide returns three packing alternatives using published 70–80kg ranges", () => {
  assert.equal(typeof guide.getKiteGuide, "function", "kite guide is implemented");
  const result = guide.getKiteGuide(input);
  assert.equal(result.status, "ready");
  assert.deepEqual(result.setups.map(setup => setup.kites.map(kite => kite.size)), [
    "9–10", "7–8,11–12", "7–8,9–10,11–12",
  ].map(sizes => sizes.split(",")));
  assert.deepEqual(result.setups.map(setup => setup.kites.length), [1, 2, 3]);
});

test("weight bands handle exact boundaries without extrapolation", () => {
  for (const [weight, expected] of [[60,"8–9"],[70,"8–9"],[70.1,"9–10"],[80,"9–10"],[80.1,"10–11"],[90,"10–11"],[90.1,"11–12"],[120,"11–12"]]) {
    const result = guide.getKiteGuide({ ...input, weight });
    assert.equal(result.setups[0].kites[0].size, expected, `${weight}kg`);
  }
  for (const weight of [40,59.9,120.1,160]) {
    assert.equal(guide.getKiteGuide({ ...input, weight }).status, "team-check");
  }
});

test("pounds and kilograms produce equivalent kite choices", () => {
  const kilos = guide.getKiteGuide(input);
  const pounds = guide.getKiteGuide({ ...input, weight: 165.35, unit: "lb" });
  assert.deepEqual(pounds.setups, kilos.setups);
});

test("months account for same-month, New Year and mixed-season trips", () => {
  for (const [arrivalMonth, departureMonth, season] of [
    [12, 1, "amihan"],
    [11, 4, "amihan"],
    [6, 10, "habagat"],
    [5, 5, "transition"],
    [4, 6, "mixed"],
    [1, 12, "mixed"],
    [12, 11, "mixed"],
    [4, 4, "amihan"],
    [10, 6, "mixed"],
  ]) assert.equal(guide.getKiteGuide({ ...input, arrivalMonth, departureMonth }).season.id, season);
});

test("skill level changes advice without treating experience as a larger-kite multiplier", () => {
  const beginner = guide.getKiteGuide({ ...input, level: "beginner" });
  const advanced = guide.getKiteGuide({ ...input, level: "advanced" });
  assert.match(beginner.levelNote, /instructor/i);
  assert.match(advanced.levelNote, /freeride/i);
  assert.deepEqual(beginner.setups, advanced.setups);
});

test("malformed input cannot produce recommendations", () => {
  for (const change of [
    {weight:NaN},{weight:Infinity},{weight:0},{weight:-5},{weight:"75"},
    {unit:"stone"},{level:"expert"},{arrivalMonth:0},{arrivalMonth:13},
    {arrivalMonth:1.5},{arrivalMonth:"1"},{arrivalMonth:NaN},{departureMonth:Infinity},
    {departureMonth:0},{departureMonth:13},{departureMonth:null},{departureMonth:undefined},
  ]) assert.equal(guide.getKiteGuide({ ...input, ...change }).status, "invalid", JSON.stringify(change));
});
