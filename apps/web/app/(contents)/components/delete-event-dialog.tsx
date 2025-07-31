'use client';

import Loading from '@/app/components/loading';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  toast,
} from '@repo/ui/components';
import { Trash2 } from '@repo/ui/components/icons';
import { useState, useTransition } from 'react';
import { deleteEvent } from '../actions/delete-event';

const DeleteEventDialog = ({
  eventId,
  title,
}: {
  eventId: string;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = await deleteEvent(eventId);
      toast(result.message);
      if (result.message) setIsOpen(false);
    });
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger className="align-middle">
          <Trash2 className="cursor-pointer hover:text-red-400" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}を削除しますか？</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleClick}>
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {isPending && <Loading />}
    </>
  );
};

export default DeleteEventDialog;
