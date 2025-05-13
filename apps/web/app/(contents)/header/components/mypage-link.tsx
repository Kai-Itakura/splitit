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
        <ProfileAvatar userId={user.id} size="lg" />
      </Link>
      <div className="select-text">
        <p className="text-lg">{user.name}</p>
        <p className="text-xs text-gray-500">
          ID: <span className="select-all">{user.id}</span>
        </p>
      </div>
    </div>
  );
};

export default MypageLink;
