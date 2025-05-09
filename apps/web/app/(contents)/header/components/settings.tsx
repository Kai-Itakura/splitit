'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components';
import { useState } from 'react';
import { User } from '../types/user.type';
import LogoutButton from './logout-button';
import MypageLink from './mypage-link';
import ProfileAvatar from './profile-avatar';

const Settings = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="rounded-full cursor-pointer">
        <ProfileAvatar userId={user.id} size="sm" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <MypageLink user={user} setOpen={setOpen} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Settings;
