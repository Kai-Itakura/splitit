import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/components';
import Link from 'next/link';
import { ReactNode } from 'react';

export type FormType = 'signup' | 'login';

const FormCard = ({
  type,
  children,
}: {
  type: FormType;
  children: ReactNode;
}) => {
  const isSignup = type === 'signup';

  return (
    <Card className="my-20 mx-5 min-sm::mx-20 min-md:max-w-3xl min-md:mx-auto">
      <CardHeader className="font-bold text-xl">
        {isSignup ? 'サインアップ' : 'ログイン'}
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="justify-end">
        <p className="text-sm text-gray-500">
          {isSignup ? '登録済みの方は' : 'まだアカウントを持っていない方は'}
          <Link
            href={isSignup ? '/login' : '/signup'}
            className="text-blue-500 hover:underline active:text-blue-700"
          >
            {isSignup ? 'ログイン' : 'サインアップ'}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default FormCard;
