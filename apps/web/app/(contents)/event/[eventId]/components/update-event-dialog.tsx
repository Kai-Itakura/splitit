'use client';

import { deleteEvent } from '@/app/(contents)/actions/delete-event';
import DeleteButton from '@/app/components/delete-button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const actionFunction = () => deleteEvent(id);

  const onDelete = () => router.push('/');

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
        <DeleteButton
          title={title}
          action={actionFunction}
          setOpen={setOpen}
          onDelete={onDelete}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEventDialog;
