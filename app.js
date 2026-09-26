// app.js：渲染结果
import { above } from "./flag.js";
import { longestRun } from "./run.js";

export function render(spec) {
  const values = spec.values || [];
  const threshold = spec.threshold || 0;
  const view = longestRun(values, threshold);
  const flags = view.flags || [];
  return { flags: flags, longest: view.longest || 0, runs: view.runs || 0,
           above_count: flags.filter((item) => item).length, threshold: threshold,
           count: values.length };
}
