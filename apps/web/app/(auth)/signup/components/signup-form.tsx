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
  PassWordInput,
  toast,
} from '@repo/ui/components';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FORM_STATUS } from '../../../actions/form-state';
import { signup } from '../../actions/signup';
import FormCard from '../../components/form-card';
import {
  SignupFormSchema,
  signupFormSchema,
} from '../../schema/signup-form.schema';

const SignupForm = () => {
  const form = useForm<SignupFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const [state, formAction, isPending] = useActionState(signup, {
    status: FORM_STATUS.IDLE,
  });

  const router = useRouter();

  useEffect(() => {
    switch (state.status) {
      case 'success': {
        form.reset();
        toast(state.message);
        router.push('/login');
        break;
      }

      case 'error': {
        toast(state.message);
        break;
      }

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <FormCard type="signup">
      {' '}
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
                <FormDescription>パスワードを入力して下さい。</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending || !form.formState.isValid}
            className="cursor-pointer"
          >
            サインアップ
          </Button>
        </form>
      </Form>
    </FormCard>
  );
};

export default SignupForm;
