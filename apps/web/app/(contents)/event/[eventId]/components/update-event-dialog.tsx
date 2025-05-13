'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components';
import { ReactNode, useState } from 'react';
import UpdateEventForm from './update-event-form';

const UpdateEventDialog = ({
  id,
  title,
  currency,
  children,
}: {
  id: string;
  title: string;
  currency: string;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-8">
        <DialogHeader>
          <DialogTitle>イベント更新</DialogTitle>
        </DialogHeader>
        <UpdateEventForm
          id={id}
          title={title}
          currency={currency}
          setDialogOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEventDialog;
