export const CURRENCY_TYPES = ['JPY', 'USD', 'EUR'] as const;
export type CurrencyType = (typeof CURRENCY_TYPES)[number];
