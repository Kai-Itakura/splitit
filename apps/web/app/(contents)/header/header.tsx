import { client } from '@/openapi.config';
import Link from 'next/link';
import Settings from './components/settings';
import { User } from './types/user.type';

const Header = async () => {
  const { data } = (await client.GET('/user/me')) as { data: User };

  return (
    <header className="sticky top-0 left-0 z-50 flex justify-between items-center h-16 w-full px-4 bg-background shadow-sm">
      <Link href="/" className="font-extrabold text-2xl">
        SplitIt
      </Link>
      <Settings user={data} />
    </header>
  );
};

export default Header;
