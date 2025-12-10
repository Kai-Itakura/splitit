'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components';
import { EditIcon } from '@repo/ui/components/icons';
import { useState } from 'react';
import UpdatePasswordForm from './update-password-form';

const EditAccountDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="mt-2 gap-1 text-muted-foreground">
          <EditIcon />
          アカウント情報を編集
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>アカウント情報を編集</DialogTitle>
        </DialogHeader>
        <UpdatePasswordForm />
        <div className="justify-self-end">
          {/* <DeleteButton title="アカウント" setOpen={setOpen} size="sm" /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountDialog;
