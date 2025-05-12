'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
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
} from '@repo/ui/components';
import { useForm } from 'react-hook-form';
import {
  createExpenseSchema,
  CreateExpenseSchema,
} from '../create-expense.schema';
import { EventMember } from '../types/event-member';

const CreateExpenseForm = ({ members }: { members: EventMember }) => {
  const form = useForm<CreateExpenseSchema>({
    mode: 'onChange',
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      title: '',
      amount: '',
      payerId: '',
      payeeIds: members.map((member) => member.id),
    },
  });

  return (
    <Form {...form}>
      <form action={(data) => console.log(data)} className="space-y-8">
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
                >
                  <SelectTrigger>
                    <SelectValue placeholder="立て替えた人を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {members.map((member) => (
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
        <Button
          disabled={!form.formState.isValid}
          className="w-full cursor-pointer"
        >
          作成
        </Button>
      </form>
    </Form>
  );
};

export default CreateExpenseForm;
