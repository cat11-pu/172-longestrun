// flag.js：判一个值是否严格超过阈值（等于不算，null/undefined 不算）
export function above(value, threshold) {
  return value > threshold;
}
