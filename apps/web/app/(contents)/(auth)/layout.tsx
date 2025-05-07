import BaseLayout from '@/app/base-layout';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  console.log('⚡️ AuthLayout rendered');
  return <BaseLayout>{children}</BaseLayout>;
};

export default AuthLayout;
