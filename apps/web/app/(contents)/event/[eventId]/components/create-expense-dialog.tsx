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
import CreateExpenseForm from './create-expense-form';

const CreateExpenseDialog = ({
  eventId,
  members,
  children,
}: Readonly<{
  eventId: string;
  members: EventMember;
  children: React.ReactNode;
}>) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-8">
        <DialogHeader>
          <DialogTitle>立て替え記録作成</DialogTitle>
        </DialogHeader>
        <CreateExpenseForm
          eventId={eventId}
          members={members}
          setDialogOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpenseDialog;
