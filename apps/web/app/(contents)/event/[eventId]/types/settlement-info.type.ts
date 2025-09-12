export type SettlementInfo = {
  id: string;
  amount: number;
  payer: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  payee: {
    id: string;
    name: string;
    imageUrl?: string;
  };
};
