'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@repo/ui/components';
import PassWordInput from '@repo/ui/components/ui/password-input';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FORM_STATUS } from '../../action/form-state';
import { login } from '../../action/login';
import FormCard from '../../components/form-card';
import {
  loginFormSchema,
  LoginFormSchema,
} from '../../schema/login-form.schema';

const LoginForm = () => {
  const form = useForm<LoginFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [state, formAction, isPending] = useActionState(login, {
    status: FORM_STATUS.IDLE,
  });

  const router = useRouter();

  useEffect(() => {
    switch (state.status) {
      case 'success': {
        form.reset();
        router.push('/');
        break;
      }

      case 'error': {
        console.error(state.message);
        break;
      }

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <FormCard type="login">
      <Form {...form}>
        <form className="space-y-8" action={formAction}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  メールアドレスを入力して下さい。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <PassWordInput {...field} />
                </FormControl>
                <FormDescription>パスワードを入力して下さい。</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending || !form.formState.isValid}
            className="cursor-pointer"
          >
            ログイン
          </Button>
        </form>
      </Form>
    </FormCard>
  );
};

export default LoginForm;
