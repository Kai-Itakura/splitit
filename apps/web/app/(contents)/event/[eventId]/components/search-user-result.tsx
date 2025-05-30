'use client';

import ProfileAvatar from '@/app/(contents)/header/components/profile-avatar';
import { User } from '@/app/(contents)/header/types/user.type';
import { Button, toast } from '@repo/ui/components';
import { SetStateAction, useTransition } from 'react';
import { addUser } from '../actions/add-user';
import { BUTTON_ACTION_STATUS } from '../actions/button-action-status';

const SearchUserResult = ({
  user,
  eventId,
  setKey,
}: {
  user: User;
  eventId: string;
  setKey: React.Dispatch<SetStateAction<string>>;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleButtonClick = () =>
    startTransition(async () => {
      const result = await addUser(user.id, eventId);

      toast(result.message);

      if (result.status === BUTTON_ACTION_STATUS.SUCCESS) {
        setKey(crypto.randomUUID());
      }
    });

  return (
    <div className="flex items-center flex-col gap-2">
      <ProfileAvatar className="hover:border-none" userId={user.id} size="lg" />
      <h2>{user.name}</h2>
      <Button
        onClick={handleButtonClick}
        size="sm"
        variant="outline"
        disabled={isPending}
      >
        追加
      </Button>
    </div>
  );
};

export default SearchUserResult;
