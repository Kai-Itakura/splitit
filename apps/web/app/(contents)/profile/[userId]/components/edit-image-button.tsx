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

  return (
    <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <DropdownMenuTrigger className="absolute bottom-0 right-0" asChild>
        <Button variant="outline">
          編集
          <EditIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <Label htmlFor={inputId}>画像をアップロード</Label>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            // Dropdown の自動クローズを防いで、Dialog がアンマウントされないようにする
            e.preventDefault();
          }}
        >
          <DeleteImageDialog setIsOpen={setIsOpen} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditImageButton;
