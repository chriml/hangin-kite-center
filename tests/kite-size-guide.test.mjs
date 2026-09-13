import assert from "node:assert/strict";
import test from "node:test";

import { readFile } from "node:fs/promises";
import ts from "typescript";

// Compile with the installed TypeScript so tests also work on Node 20.
const source = await readFile(new URL("../content/kite-size-guide.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
const guide = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`);
const input = { weight: 75, unit: "kg", arrivalMonth: 12, departureMonth: 12, level: "intermediate" };

test("guide returns whole kite sizes with useful spacing for December", () => {
  assert.equal(typeof guide.getKiteGuide, "function", "kite guide is implemented");
  const result = guide.getKiteGuide(input);
  assert.equal(result.status, "ready");
  assert.deepEqual(result.setups.map(setup => setup.kites.map(kite => kite.size)), [
    [9], [7, 11], [7, 9, 11],
  ]);
  assert.deepEqual(result.setups.map(setup => setup.kites.length), [1, 2, 3]);
});

test("weight bands handle exact boundaries without extrapolation", () => {
  for (const [weight, expected] of [[60,8],[70,8],[70.1,9],[80,9],[80.1,10],[90,10],[90.1,11],[120,11]]) {
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
    [6, 9, "habagat"],
    [6, 10, "mixed"],
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


test("selected months change sizes using Hangin's rough ranges", () => {
  const expectations = [
    [1, 20, 30, 7], [2, 15, 20, 9], [3, 10, 20, 11],
    [4, 10, 15, 14], [10, 10, 15, 14], [11, 10, 15, 14],
    [12, 15, 25, 9],
  ];
  for (const [month, min, max, size] of expectations) {
    const result = guide.getKiteGuide({ ...input, arrivalMonth: month, departureMonth: month });
    assert.equal(result.status, "ready");
    assert.equal(result.wind.minKnots, min);
    assert.equal(result.wind.maxKnots, max);
    assert.equal(result.setups[0].kites[0].size, size);
    assert.equal(Boolean(result.wind.months[0].estimated), [3, 12].includes(month));
  }
  assert.deepEqual(guide.kiteSizeBands.map(band => band.veryLight), ["12–14", "13–15", "14–17", "15–17"]);
});

test("January retains stronger spells without extrapolating the size chart", () => {
  const result = guide.getKiteGuide({ ...input, arrivalMonth: 1, departureMonth: 1 });
  assert.equal(result.wind.maxKnots, 30);
  assert.equal(result.wind.occasionalKnots, 35);
  assert.deepEqual(result.setups.map(setup => setup.kites.map(kite => kite.wind)), [
    ["23–28"], ["23–28", "18–22"], [],
  ]);
  assert.match(result.setups[2].description, /extra size|third kite/i);
});

test("off-season and mixed trips never invent usable wind or packing ranges", () => {
  for (let month = 5; month <= 9; month++) {
    const result = guide.getKiteGuide({ ...input, arrivalMonth: month, departureMonth: month });
    assert.equal(result.status, "team-check");
    assert.equal(result.wind.minKnots, null);
    assert.equal(result.wind.maxKnots, null);
    assert.equal(result.wind.includesOffSeason, true);
    assert.equal(result.setups, undefined);
  }
  const mixed = guide.getKiteGuide({ ...input, arrivalMonth: 4, departureMonth: 6 });
  assert.equal(mixed.status, "team-check");
  assert.equal(mixed.wind.minKnots, 10);
  assert.equal(mixed.wind.maxKnots, 15);
  assert.equal(mixed.setups, undefined);
});

test("cross-year trips include each intervening month and its wind extremes", () => {
  const result = guide.getKiteGuide({ ...input, arrivalMonth: 11, departureMonth: 2 });
  assert.deepEqual(result.wind.months.map(month => month.month), [11, 12, 1, 2]);
  assert.equal(result.wind.minKnots, 10);
  assert.equal(result.wind.maxKnots, 30);
  assert.equal(result.wind.occasionalKnots, 35);
});

test("every month pair either returns distinct supported references or requests a team check", () => {
  for (let arrivalMonth = 1; arrivalMonth <= 12; arrivalMonth++) {
    for (let departureMonth = 1; departureMonth <= 12; departureMonth++) {
      const result = guide.getKiteGuide({ ...input, arrivalMonth, departureMonth });
      assert.equal(result.wind.months.length, (departureMonth - arrivalMonth + 12) % 12 + 1);
      if (result.wind.includesOffSeason) {
        assert.equal(result.status, "team-check");
        continue;
      }
      assert.equal(result.status, "ready");
      for (const setup of result.setups) {
        assert.equal(new Set(setup.kites.map(kite => kite.wind)).size, setup.kites.length);
        for (const kite of setup.kites) {
          const [min, max] = kite.wind.split("–").map(Number);
          assert.ok(min >= 10 && max <= 28);
          assert.ok(max >= result.wind.minKnots && min <= result.wind.maxKnots);
        }
      }
    }
  }
});


test("one kite uses the median month midpoint rather than the combined wind extremes", () => {
  const result = guide.getKiteGuide({ ...input, weight: 76, arrivalMonth: 12, departureMonth: 2 });
  assert.equal(result.planningWindKnots, 20);
  assert.deepEqual(result.setups.map(setup => setup.kites.map(kite => kite.size)), [[9], [7, 11], [7, 9, 11]]);
  const even = guide.getKiteGuide({ ...input, arrivalMonth: 11, departureMonth: 2 });
  assert.equal(even.planningWindKnots, 18.75);
  assert.equal(even.setups[0].kites[0].size, 9);
});

test("multi-kite choices respond to the typical monthly bounds instead of always taking extremes", () => {
  const result = guide.getKiteGuide({ ...input, arrivalMonth: 10, departureMonth: 1 });
  assert.deepEqual(result.setups[1].kites.map(kite => kite.size), [9, 14]);
});

test("all weight bands and month pairs keep whole, well-spaced, source-supported sizes", () => {
  for (const weight of [60, 75, 85, 110, 120]) {
    const band = guide.kiteSizeBands.find(band => weight <= band.maxKg);
    for (let arrivalMonth = 1; arrivalMonth <= 12; arrivalMonth++) {
      for (let departureMonth = 1; departureMonth <= 12; departureMonth++) {
        const result = guide.getKiteGuide({ ...input, weight, arrivalMonth, departureMonth });
        if (result.status !== "ready") continue;
        result.setups.forEach((setup, index) => {
          assert.ok(setup.kites.length === 0 || setup.kites.length === index + 1);
          setup.kites.forEach((kite, i) => {
            assert.ok(Number.isInteger(kite.size));
            const key = {"10–13":"veryLight", "14–17":"light", "18–22":"medium", "23–28":"strong"}[kite.wind];
            const [low, high] = band[key].split("–").map(Number);
            assert.ok(kite.size >= low && kite.size <= high);
            if (i) {
              const smaller = setup.kites[i-1].size;
              assert.ok(kite.size - smaller >= 2);
              assert.ok(kite.size >= smaller * 1.2);
            }
          });
        });
      }
    }
  }
});
