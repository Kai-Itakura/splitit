'use client';

import { FORM_STATUS } from '@/app/(contents)/actions/form-state';
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
  RadioGroup,
  RadioGroupItem,
} from '@repo/ui/components';
import { SearchIcon } from '@repo/ui/components/icons';
import { useActionState, useState } from 'react';
import { useForm } from 'react-hook-form';
import { searchUser } from '../actions/search-user';
import {
  getSearchFormSchema,
  SEARCH_TYPE,
  SearchFormSchema,
  SearchType,
} from '../schema/search-user-form.schema';

const SearchUserForm = () => {
  const [searchType, setSearchType] = useState<SearchType>(SEARCH_TYPE.EMAIL);

  const form = useForm<SearchFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(getSearchFormSchema(searchType)),
    defaultValues: {
      type: searchType,
      value: '',
    },
  });

  const [state, formAction, isPending] = useActionState(searchUser, {
    status: FORM_STATUS.IDLE,
  });
  // console.log('🔥 ~ SearchUserForm ~ state:', state);

  return (
    <>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    className="flex items-center gap-5"
                    defaultValue={field.value}
                    onValueChange={(value: SearchType) => {
                      setSearchType(value);
                      form.setValue('type', value);
                      form.reset();
                    }}
                  >
                    <FormItem className="flex items-center gap-1">
                      <FormControl>
                        <RadioGroupItem value={SEARCH_TYPE.EMAIL} />
                      </FormControl>
                      <FormLabel>email</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-1">
                      <FormControl>
                        <RadioGroupItem value={SEARCH_TYPE.ID} />
                      </FormControl>
                      <FormLabel>ID</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      className="placeholder:text-sm"
                      placeholder={
                        searchType === SEARCH_TYPE.EMAIL
                          ? 'emailで検索'
                          : 'IDで検索'
                      }
                      {...field}
                    />
                  </FormControl>
                  <Button
                    disabled={isPending || !form.formState.isValid}
                    variant="ghost"
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    <SearchIcon />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default SearchUserForm;
