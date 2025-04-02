'use client';

import {
  authFormSchema,
  AuthFormSchema,
} from '@/app/(auth)/schema/auth-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@repo/ui/components/ui/form';
import { useForm } from 'react-hook-form';

const AuthForm = () => {
  const form = useForm<AuthFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  return <Form></Form>;
};

export default AuthForm;
