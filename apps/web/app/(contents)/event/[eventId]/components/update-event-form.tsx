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
  toast,
} from '@repo/ui/components';
import { Dispatch, SetStateAction, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FORM_STATUS } from '../../../actions/form-state';
import { updateEvent } from '../../../actions/update-event';
import {
  updateEventSchema,
  UpdateEventSchema,
} from '../../../schema/update-event.schema';

const UpdateEventForm = ({
  id,
  title,
  currency,
  setDialogOpen,
}: {
  id: string;
  title: string;
  currency: string;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<UpdateEventSchema>({
    mode: 'onChange',
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      id,
      title,
      currency,
    },
  });

  const [state, formAction, isPending] = useActionState(updateEvent, {
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
          name="id"
          render={({ field }) => (
            <FormItem className="m-0">
              <FormControl>
                <Input {...field} type="hidden" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>イベント名</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Select
                  defaultValue={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue('currency', value);
                  }}
                  {...field}
                >
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
            className="w-full cursor-pointer"
          >
            イベントを更新
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateEventForm;
