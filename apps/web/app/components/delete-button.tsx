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
import Loading from './loading';

const DeleteButton = ({
  title,
  action,
  setOpen,
  onDelete,
}: {
  title: string;
  action: () => Promise<ButtonActionStatus>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  onDelete?: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleActionButtonClick = () =>
    startTransition(async () => {
      const result = await action();
      toast(result.message);
      if (result.status === BUTTON_ACTION_STATUS.SUCCESS) {
        setOpen(false);
        onDelete?.();
      }
    });

  return (
    <>
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
              variant="destructive"
            >
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {isPending && <Loading />}
    </>
  );
};

export default DeleteButton;
