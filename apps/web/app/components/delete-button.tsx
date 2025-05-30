'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  toast,
} from '@repo/ui/components';
import { SetStateAction, useTransition } from 'react';
import {
  BUTTON_ACTION_STATUS,
  ButtonActionStatus,
} from '../(contents)/event/[eventId]/actions/button-action-status';

const DeleteButton = ({
  title,
  action,
  setOpen,
}: {
  title: string;
  action: () => Promise<ButtonActionStatus>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleActionButtonClick = () =>
    startTransition(async () => {
      const result = await action();

      toast(result.message);

      if (result.status === BUTTON_ACTION_STATUS.SUCCESS) setOpen(false);
    });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-500/80">削除</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}を削除しますか？</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleActionButtonClick}
            className="bg-red-500 hover:bg-red-500/80"
          >
            削除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
