'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CURRENCY_TYPES } from '@repo/types';
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { createEvent } from '../actions/create-event';
import { FORM_STATUS } from '../actions/form-state';
import { CreateEventSchema, createEventSchema } from '../create-event.schema';

const CreateEventForm = () => {
  const form = useForm<CreateEventSchema>({
    mode: 'onChange',
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: '',
      currency: undefined,
    },
  });

  const [state, formAction, isPending] = useActionState(createEvent, {
    status: FORM_STATUS.IDLE,
  });
  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>イベント名</FormLabel>
              <FormControl>
                <Input placeholder="イベント名を入力してください" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>通貨</FormLabel>
              <FormControl>
                <Select {...field} defaultValue={CURRENCY_TYPES[0]}>
                  <SelectTrigger>
                    <SelectValue placeholder="通貨を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>通貨</SelectLabel>
                      {CURRENCY_TYPES.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="text-right">
          <Button
            disabled={isPending || !form.formState.isValid}
            className="cursor-pointer"
          >
            作成
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateEventForm;
