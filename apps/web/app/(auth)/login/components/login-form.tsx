'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@repo/ui/components';
import PassWordInput from '@repo/ui/components/ui/password-input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { Form, useForm } from 'react-hook-form';
import { FORM_STATUS } from '../../action/form-state';
import { login } from '../../action/login';
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
      }

      case 'error': {
        console.error(state.message);
      }

      default:
        break;
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
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
                  <FormDescription>
                    パスワードを入力して下さい。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending || !form.formState.isValid}>
              ログイン
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          まだアカウントを持っていない場合は
          <Link href="signin" className="text-blue-400 active:text-red-400">
            サインイン
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
