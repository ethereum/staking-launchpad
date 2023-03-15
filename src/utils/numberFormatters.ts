export const formatPercent = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 3,
  }).format(value);

export const formatNumber = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale).format(value);
