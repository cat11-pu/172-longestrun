import assert from "node:assert";
import { above } from "../flag.js";
import { longestRun } from "../run.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("above returns a boolean", () => {
  assert.strictEqual(typeof above(5, 3), "boolean");
});

check("longestRun returns counts", () => {
  assert.strictEqual(typeof longestRun([1], 0).longest, "number");
});

check("longestRun returns flags", () => {
  assert.ok(Array.isArray(longestRun([1], 0).flags));
});

check("render counts values", () => {
  assert.strictEqual(typeof render({ values: [1], threshold: 0 }).count, "number");
});

check("render counts above", () => {
  assert.strictEqual(typeof render({ values: [1], threshold: 0 }).above_count, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
