import CopyButton from '@/app/components/copy-button';
import { Label } from '@repo/ui/components';
import Link from 'next/link';
import { User } from '../types/user.type';
import ProfileAvatar from './profile-avatar';

const MypageLink = ({
  user,
  setOpen,
}: {
  user: User;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <Link href={`/profile/${user.id}`} onClick={() => setOpen(false)}>
        <ProfileAvatar userId={user.id} size="lg" imageUrl={user.imageUrl} />
      </Link>
      <div className="space-y-1 select-text">
        <p className="text-lg font-bold">{user.name}</p>
        <div>
          <Label className="text-sm">ユーザーID</Label>
          <p className="flex items-center text-xs text-gray-500">
            <CopyButton label="ユーザーID" value={user.id} />
            {user.id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MypageLink;
