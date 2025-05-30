'use client';

import DeleteButton from '@/app/components/delete-button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components';
import { useState } from 'react';
import { deleteExpense } from '../actions/delte-expense';
import { EventMember } from '../types/event-member';
import { Expense } from '../types/expense.type';
import UpdateExpenseForm from './update-expense-form';

const UpdateExpenseDialog = ({
  eventId,
  expense,
  member,
  children,
}: Readonly<{
  eventId: string;
  expense: Expense;
  member: EventMember;
  children: React.ReactNode;
}>) => {
  const [open, setOpen] = useState(false);

  const actionFunction = () => deleteExpense(eventId, expense.id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-8">
        <DialogHeader>
          <DialogTitle>立て替え記録更新</DialogTitle>
        </DialogHeader>
        <UpdateExpenseForm
          eventId={eventId}
          expense={expense}
          member={member}
          setDialogOpen={setOpen}
        />
        <DeleteButton
          title={expense.title}
          action={actionFunction}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateExpenseDialog;
