import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
} from '@repo/ui/components';
import { EditIcon } from '@repo/ui/components/icons';

const EditImageButton = ({ inputId }: { inputId: string }) => {
  return (
    <DropdownMenu>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditImageButton;
