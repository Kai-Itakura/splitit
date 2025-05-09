'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components';
import { useState } from 'react';
import { Members } from '../types/members.type';
import CreateExpenseForm from './create-expense-form';

const CreateExpenseDialog = ({
  children,
  members,
}: Readonly<{ children: React.ReactNode; members: Members }>) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-8">
        <DialogHeader>
          <DialogTitle>立て替え記録作成</DialogTitle>
        </DialogHeader>
        <CreateExpenseForm members={members} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpenseDialog;
