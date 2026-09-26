// run.js：找最长连续超阈值段（一次扫描，每个值只判一次）
import { above } from "./flag.js";

export function longestRun(values, threshold) {
  if (!values || values.length === 0) {
    const error = new Error("values 为空，没有可扫描的数值");
    error.code = "E_EMPTY_VALUES";
    throw error;
  }
  const flags = new Array(values.length);
  let longest = 0;
  let runs = 0;
  let current = 0;
  for (let spot = 0; spot < values.length; spot += 1) {
    const hit = above(values[spot], threshold);
    flags[spot] = hit;
    if (hit) {
      current += 1;
      if (current > longest) longest = current;
    } else if (current > 0) {
      runs += 1;
      current = 0;
    }
  }
  if (current > 0) runs += 1;
  return { longest: longest, runs: runs, flags: flags };
}
