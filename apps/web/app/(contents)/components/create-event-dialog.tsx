'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components';
import { ReactNode, useState } from 'react';
import CreateEventForm from './create-event-form';

const CreateEventDialog = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-8">
        <DialogHeader>
          <DialogTitle>イベント作成</DialogTitle>
        </DialogHeader>
        <CreateEventForm setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
