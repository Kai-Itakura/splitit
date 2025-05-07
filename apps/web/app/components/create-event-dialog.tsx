'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components';
import { useState } from 'react';
import CreateEventForm from './create-event-form';

const CreateEventDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex mx-auto mt-6 cursor-pointer">
          イベントを作成
        </Button>
      </DialogTrigger>
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
