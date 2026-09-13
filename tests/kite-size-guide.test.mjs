import assert from "node:assert/strict";
import test from "node:test";

import { readFile } from "node:fs/promises";
import ts from "typescript";

// Compile with the installed TypeScript so tests also work on Node 20.
const source = await readFile(new URL("../content/kite-size-guide.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
const guide = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`);
const input = { weight: 75, unit: "kg", arrival: "2027-01-10", departure: "2027-01-24", level: "intermediate" };

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

test("dates account for every month in cross-year and mixed-season trips", () => {
  for (const [arrival, departure, season] of [
    ["2026-12-20","2027-01-10","amihan"],
    ["2027-06-01","2027-10-31","habagat"],
    ["2027-05-01","2027-05-31","transition"],
    ["2027-04-28","2027-06-03","mixed"],
    ["2027-01-01","2027-12-31","mixed"],
    ["2027-01-01","2028-01-01","mixed"],
  ]) assert.equal(guide.getKiteGuide({ ...input, arrival, departure }).season.id, season);
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
    {unit:"stone"},{level:"expert"},{arrival:""},{arrival:"2027-02-30"},
    {arrival:"2027-2-01"},{departure:"2026-01-01"},{departure:"invalid"},
  ]) assert.equal(guide.getKiteGuide({ ...input, ...change }).status, "invalid", JSON.stringify(change));
  assert.equal(guide.getKiteGuide({...input, arrival:"2028-02-29", departure:"2028-02-29"}).status,"ready");
});
