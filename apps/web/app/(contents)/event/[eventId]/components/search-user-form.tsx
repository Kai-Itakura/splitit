'use client';

import { FORM_STATUS } from '@/app/(contents)/actions/form-state';
import { User } from '@/app/(contents)/header/types/user.type';
import { zodResolver } from '@hookform/resolvers/zod';
import {
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
import { SetStateAction, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { searchUser } from '../actions/search-user';
import {
  getSearchFormSchema,
  SEARCH_TYPE,
  SearchFormSchema,
  SearchType,
} from '../schema/search-user-form.schema';
import SearchUserResult from './search-user-result';

const SearchUserForm = ({
  eventId,
  setKey,
}: {
  eventId: string;
  setKey: React.Dispatch<SetStateAction<string>>;
}) => {
  const [searchType, setSearchType] = useState<SearchType>(SEARCH_TYPE.EMAIL);
  const [user, setUser] = useState<User | null>(null);

  const form = useForm<SearchFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(getSearchFormSchema(searchType)),
    defaultValues: {
      type: searchType,
      value: '',
    },
  });

  useEffect(() => {
    form.setValue('type', searchType);
    form.setValue('value', '');
    form.clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchType]);

  const [state, formAction, isPending] = useActionState(searchUser, {
    status: FORM_STATUS.IDLE,
  });

  useEffect(() => {
    switch (state.status) {
      case FORM_STATUS.ERROR:
        setUser(null);
        break;
      case FORM_STATUS.SUCCESS:
        setUser(state.data);
        break;
      default:
        break;
    }
  }, [state]);

  return (
    <>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                {form.formState.errors.type?.message}
                <FormControl>
                  <RadioGroup
                    className="flex items-center gap-5"
                    onValueChange={(value: SearchType) => {
                      setSearchType(value);
                      field.onChange(value);
                    }}
                    {...field}
                  >
                    <FormItem className="flex items-center gap-1">
                      <FormLabel className="cursor-pointer">
                        <FormControl>
                          <RadioGroupItem
                            {...field}
                            value={SEARCH_TYPE.EMAIL}
                            className="cursor-pointer"
                          />
                        </FormControl>
                        email
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-1">
                      <FormLabel className="cursor-pointer">
                        <FormControl>
                          <RadioGroupItem
                            {...field}
                            value={SEARCH_TYPE.ID}
                            className="cursor-pointer"
                          />
                        </FormControl>
                        ID
                      </FormLabel>
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
                  <button
                    disabled={isPending || !form.formState.isValid}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-3 cursor-pointer hover:text-blue-400 disabled:pointer-events-none"
                  >
                    <SearchIcon size={20} />
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {state.status !== FORM_STATUS.IDLE &&
        (user ? (
          <SearchUserResult user={user} eventId={eventId} setKey={setKey} />
        ) : (
          <p>ユーザーが見つかりません。</p>
        ))}
    </>
  );
};

export default SearchUserForm;
