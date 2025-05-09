'use client';

import { LogOut } from '@repo/ui/components/icons';
import { logout } from '../actions/logout';

const LogoutButton = () => {
  return (
    <div
      className="flex justify-center items-center gap-3 w-full cursor-pointer"
      onClick={() => logout()}
    >
      <LogOut />
      ログアウト
    </div>
  );
};

export default LogoutButton;
