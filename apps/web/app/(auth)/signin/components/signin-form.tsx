'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FORM_STATUS } from '../../action/form-state';
import { signin } from '../../action/signin';
import {
  SigninFormSchema,
  signinFormSchema,
} from '../../schema/signin-form.schema';

const SigninForm = () => {
  const form = useForm<SigninFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const [state, formAction, isPending] = useActionState(signin, {
    status: FORM_STATUS.IDLE,
  });

  const router = useRouter();

  useEffect(() => {
    switch (state.status) {
      case 'success': {
        form.reset();
        router.push('/login');
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
        <CardTitle>サインイン</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8" action={formAction}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名前</FormLabel>
                  <FormControl>
                    <Input placeholder="山田太郎" {...field} />
                  </FormControl>
                  <FormDescription>名前を入力して下さい。</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              サインイン
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          アカウントを持っている場合は
          <Link href="login" className="text-blue-400 active:text-red-400">
            ログイン
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SigninForm;
