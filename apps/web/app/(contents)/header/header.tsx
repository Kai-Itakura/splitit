import { client } from '@/openapi.config';
import Link from 'next/link';
import Settings from './components/settings';
import { User } from './types/user.type';

const Header = async () => {
  const { data } = (await client.GET('/user')) as { data: User };

  return (
    <header className="sticky top-0 left-0 flex justify-between items-center h-16 w-full px-4 bg-background border-b-foreground border-b-1">
      <Link href="/" className="font-extrabold text-2xl">
        SplitIt
      </Link>
      <Settings user={data} />
    </header>
  );
};

export default Header;
