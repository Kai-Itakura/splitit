export class EventGroupDetailDto {
  id: string;
  title: string;
  currency: string;
  createdAt: Date;
  member: {
    id: string;
    name: string;
  }[];
  expenses: {
    id: string;
    title: string;
    amount: number;
    createdAt: Date;
    payer: {
      id: string;
      name: string;
    };
    payees: {
      id: string;
    }[];
  }[];
  settlements: {
    id: string;
    payeeId: string;
    payerId: string;
    amount: number;
  }[];
  totalExpense: number;
}
