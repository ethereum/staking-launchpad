export const numberWithCommas = (n: number | string): string =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
