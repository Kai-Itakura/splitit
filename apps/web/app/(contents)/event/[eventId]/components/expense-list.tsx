'use client';

import { formatNumber } from '@/app/lib/fomat-number';
import { CurrencySymbolType } from '@/app/lib/get-currency-symbol';
import ItemCard from '@repo/ui/components/custom/item-card';
import { User, WalletIcon } from '@repo/ui/components/icons';
import { Expense } from '../types/expense.type';

const ExpenseList = ({
  expense,
  currencySymbol,
}: {
  expense: Expense;
  currencySymbol: CurrencySymbolType;
}) => {
  return (
    <ItemCard className="cursor-pointer hover:bg-gray-50">
      <h2 className="font-bold text-lg">{expense.title}</h2>
      <div className="space-y-1">
        <p className="text-xl font-bold text-right">
          {currencySymbol}
          {formatNumber(expense.amount)}
        </p>
        <div className="flex gap-3 text-sm text-slate-500">
          <p className="flex items-center gap-1">
            <WalletIcon size={14} />
            {expense.payer.name}
          </p>
          <p className="flex items-center gap-1">
            <User size={14} />
            {expense.payees?.length}
          </p>
        </div>
      </div>
    </ItemCard>
  );
};

export default ExpenseList;
