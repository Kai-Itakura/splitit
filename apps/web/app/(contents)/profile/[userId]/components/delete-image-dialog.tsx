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
import { useParams } from 'next/navigation';
import { SetStateAction } from 'react';
import deleteImage from '../actions/delete-image';

export function DeleteImageDialog({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { userId } = useParams<{ userId: string }>();

  const handleClick = async () => {
    const result = await deleteImage(userId);
    toast(result.message);
    setIsOpen(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>画像を削除する</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>本当に画像を削除しますか?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleClick}>
            削除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
