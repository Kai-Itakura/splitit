import { CurrencyType } from '@repo/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CURRENCY_SYMBOLS = ['¥', '$', '€'] as const;
type CurrencySymbolType = (typeof CURRENCY_SYMBOLS)[number];

const currencyMap: Record<CurrencyType, CurrencySymbolType> = {
  JPY: '¥',
  USD: '$',
  EUR: '€',
};

const getCurrencySymbol = (currency: CurrencyType): CurrencySymbolType => {
  return currencyMap[currency];
};

export { getCurrencySymbol };
export type { CurrencySymbolType };
