export const hslToHsb = (
  h: number,
  s: number,
  l: number,
): [h: number, s: number, b: number] => {
  s *= l < 0.5 ? l : 1 - l;
  return [h, (2 * s) / (l + s), l + s];
};
