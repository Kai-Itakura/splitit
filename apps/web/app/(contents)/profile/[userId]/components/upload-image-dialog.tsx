import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components';
import Image from 'next/image';
import { SetStateAction, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

const UploadImageDialog = ({
  open,
  setOpen,
  imageFile,
  formId,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  imageFile: File | null | undefined;
  formId: string;
}) => {
  const [preview, setPreview] = useState<string>('');
  const { pending } = useFormStatus();

  useEffect(() => {
    if (imageFile) {
      const src = URL.createObjectURL(imageFile);
      setPreview(src);
      setOpen(true);
    } else {
      setPreview('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] gap-8">
        <DialogHeader>
          <DialogTitle>プロフィール画像をアップロード</DialogTitle>
        </DialogHeader>
        <Image
          src={preview}
          alt="新しいプロフィール画像"
          width={208}
          height={208}
          className="mx-auto"
        />
        <Button type="submit" form={formId} disabled={pending}>
          アップロード
        </Button>
      </DialogContent>
      <DialogFooter>
        <DialogFooter />
      </DialogFooter>
    </Dialog>
  );
};

export default UploadImageDialog;
