import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@repo/ui/components';
import Image from 'next/image';

const Settings = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full cursor-pointer">
        <Avatar>
          <AvatarImage />
          <AvatarFallback>
            <Image
              className="w-full"
              alt="アバター"
              src={`https://robohash.org/${1}.png`}
              width={40}
              height={40}
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel></DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Settings;
