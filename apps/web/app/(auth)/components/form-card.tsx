import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/components';
import Link from 'next/link';
import { ReactNode } from 'react';

export type FormType = 'signin' | 'login';

const FormCard = ({
  type,
  children,
}: {
  type: FormType;
  children: ReactNode;
}) => {
  const isSignin = type === 'signin';

  return (
    <Card className="my-20 mx-5 min-sm::mx-20 min-md:max-w-3xl min-md:mx-auto">
      <CardHeader>{isSignin ? 'サインイン' : 'ログイン'}</CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <p>
          {isSignin ? '登録済みの方は' : 'まだアカウントを持っていない方は'}
          <Link
            href={isSignin ? '/login' : '/signin'}
            className="text-blue-500 hover:underline active:text-blue-700"
          >
            {isSignin ? 'ログイン' : 'サインイン'}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default FormCard;
