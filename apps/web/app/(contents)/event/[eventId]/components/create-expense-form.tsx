'use client';

import { FORM_STATUS } from '@/app/(contents)/actions/form-state';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from '@repo/ui/components';
import { Dispatch, SetStateAction, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createExpense } from '../actions/create-expense';
import {
  CreateExpenseSchema,
  createExpenseSchema,
} from '../schema/create-expense.schema';
import { EventMember } from '../types/event-member';

const CreateExpenseForm = ({
  eventId,
  members: member,
  setDialogOpen,
}: {
  eventId: string;
  members: EventMember;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<CreateExpenseSchema>({
    mode: 'onChange',
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      eventId,
      title: '',
      amount: '',
      payerId: '',
      payeeIds: member.map((member) => member.id),
    },
  });

  const [state, formAction, isPending] = useActionState(createExpense, {
    status: FORM_STATUS.IDLE,
  });

  useEffect(() => {
    switch (state.status) {
      case 'error':
        toast(state.message);
        break;
      case 'success':
        form.reset();
        toast(state.message);
        setDialogOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
        <FormField
          control={form.control}
          name="eventId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input placeholder="タイトルを入力してください" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>金額</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>立て替えた人</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue('payerId', value);
                  }}
                  {...field}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="立て替えた人を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {member.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payeeIds"
          render={() => (
            <FormItem>
              <FormLabel>立て替え対象者</FormLabel>
              <div className="flex gap-4">
                {member.map((member) => (
                  <FormField
                    key={member.id}
                    control={form.control}
                    name="payeeIds"
                    render={({ field }) => (
                      <FormItem key={member.id} className="flex gap-0.5">
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(member.id)}
                            onCheckedChange={(checked) => {
                              const newPayeeIds = checked
                                ? [...field.value, member.id]
                                : field.value.filter((id) => id !== member.id);
                              field.onChange(newPayeeIds);
                              form.setValue('payeeIds', newPayeeIds);
                            }}
                            {...field}
                            value={member.id}
                          />
                        </FormControl>
                        <FormLabel>{member.name}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isValid || isPending}
          className="w-full cursor-pointer"
        >
          作成
        </Button>
      </form>
    </Form>
  );
};

export default CreateExpenseForm;
