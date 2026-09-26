// run.js：一次扫描找最长连续超阈值段（每个值只判一次）
import { above } from "./flag.js";

export function longestRun(values, threshold) {
  if (!Array.isArray(values) || values.length === 0) {
    const error = new Error("数值列表为空");
    error.code = "E_EMPTY_VALUES";
    throw error;
  }

  const flags = new Array(values.length);
  let longest = 0;
  let runs = 0;
  let current = 0;

  for (let i = 0; i < values.length; i++) {
    const isAbove = above(values[i], threshold);
    flags[i] = isAbove;
    if (isAbove) {
      if (current === 0) { runs += 1; }
      current += 1;
      if (current > longest) { longest = current; }
    } else {
      current = 0;
    }
  }

  return { flags: flags, longest: longest, runs: runs };
}
