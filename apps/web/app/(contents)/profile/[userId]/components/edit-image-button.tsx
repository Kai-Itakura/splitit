import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
} from '@repo/ui/components';
import { EditIcon } from '@repo/ui/components/icons';
import { useState } from 'react';
import { DeleteImageDialog } from './delete-image-dialog';

const EditImageButton = ({ inputId }: { inputId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger className="absolute bottom-0 right-0" asChild>
          <Button variant="outline" className="p-1 gap-1">
            <EditIcon />
            編集
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>
            <Label htmlFor={inputId}>画像をアップロード</Label>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            画像を削除する
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteImageDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </>
  );
};

export default EditImageButton;
