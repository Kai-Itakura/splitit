'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components';
import { ReactNode, useState } from 'react';
import SearchUserForm from './search-user-form';

const AddUserDialog = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-8">
        <DialogHeader>
          <DialogTitle>メンバー追加</DialogTitle>
        </DialogHeader>
        <SearchUserForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
