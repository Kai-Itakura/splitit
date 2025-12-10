'use client';

import { FORM_STATUS } from '@/app/(contents)/actions/form-state';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PassWordInput,
  toast,
} from '@repo/ui/components';
import { useParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updatePassword } from '../actions/update-password';
import {
  UpdatePasswordSchema,
  updatePasswordSchema,
} from '../schema/update-password.schema';

const UpdatePasswordForm = () => {
  const { userId } = useParams<{ userId: string }>();
  const form = useForm<UpdatePasswordSchema>({
    mode: 'onChange',
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      userId,
      newPassword: '',
      confirmPassword: '',
      oldPassword: '',
    },
  });

  const [formState, formAction, isPending] = useActionState(updatePassword, {
    status: FORM_STATUS.IDLE,
  });

  useEffect(() => {
    switch (formState.status) {
      case FORM_STATUS.ERROR: {
        toast.error(formState.message);
        break;
      }
      case FORM_STATUS.SUCCESS: {
        toast.success(formState.message);
        form.reset();
        break;
      }
      default: {
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <Card>
      <CardHeader>パスワード変更</CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="m-0">
                  <FormControl>
                    <Input {...field} hidden />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>新しいパスワード</FormLabel>
                  <FormControl>
                    <PassWordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>確認用パスワード</FormLabel>
                  <FormControl>
                    <PassWordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>現在のパスワード</FormLabel>
                  <FormControl>
                    <PassWordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right">
              <Button
                disabled={isPending || !form.formState.isValid}
                className="w-full cursor-pointer"
              >
                イベントを更新
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdatePasswordForm;
