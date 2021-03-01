export function getSplitedTime(time) {
  const splitedTime = String(time).padStart(2, "0").split("");
  return splitedTime;
}
