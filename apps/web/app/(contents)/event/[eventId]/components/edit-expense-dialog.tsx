'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components';
import { useState } from 'react';
import { EventMember } from '../types/event-member';
import { Expense } from '../types/expense.type';
import EditExpenseForm from './edit-expense-form';

const EditExpenseDialog = ({
  expense,
  member,
  children,
}: Readonly<{
  expense: Expense;
  member: EventMember;
  children: React.ReactNode;
}>) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-8">
        <DialogHeader>
          <DialogTitle>立て替え記録更新</DialogTitle>
        </DialogHeader>
        <EditExpenseForm expense={expense} member={member} />
      </DialogContent>
    </Dialog>
  );
};

export default EditExpenseDialog;
