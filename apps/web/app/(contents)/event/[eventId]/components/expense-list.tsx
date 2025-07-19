'use client';

import { formatNumber } from '@/app/lib/fomat-number';
import { CurrencySymbolType } from '@/app/lib/get-currency-symbol';
import ItemCard from '@repo/ui/components/custom/item-card';
import { User, WalletIcon } from '@repo/ui/components/icons';
import { EventMember } from '../types/event-member';
import { Expense } from '../types/expense.type';
import UpdateExpenseDialog from './update-expense-dialog';

const ExpenseList = ({
  eventId,
  member,
  expense,
  currencySymbol,
}: {
  eventId: string;
  member: EventMember;
  expense: Expense;
  currencySymbol: CurrencySymbolType;
}) => {
  return (
    <UpdateExpenseDialog eventId={eventId} expense={expense} member={member}>
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
    </UpdateExpenseDialog>
  );
};

export default ExpenseList;
