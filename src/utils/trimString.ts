export const trimString = (string: string, length: number): string => {
  if (!string || length < 1 || string.length <= length) return string;
  const mid = Math.ceil(string.length / 2);
  const rmCount = string.length - length;
  const lRmIdx = Math.ceil(rmCount / 2);
  const rRmIdx = rmCount - lRmIdx;
  return `${string.substring(0, mid - lRmIdx)}...${string.substring(
    mid + rRmIdx
  )}`;
};
