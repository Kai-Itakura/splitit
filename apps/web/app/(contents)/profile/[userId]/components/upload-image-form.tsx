'use client';

import {
  FORM_STATUS,
  FormActionState,
} from '@/app/(contents)/actions/form-state';
import { getImageData } from '@/app/lib/get-image-data';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  toast,
} from '@repo/ui/components';
import { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadImage } from '../actions/upload-image';
import {
  profileImageSchema,
  ProfileImageSchema,
} from '../schema/profile-image.schema';
import UploadImageDialog from './upload-image-dialog';

const UploadImageForm = ({
  userId,
  inputId,
}: {
  userId: string;
  inputId: string;
}) => {
  const formId = 'upload-image-form';
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null | undefined>(null);

  const form = useForm<ProfileImageSchema>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(profileImageSchema),
    defaultValues: {
      userId,
      image: new File([], ''),
    },
  });

  const [state, formAction] = useActionState<FormActionState, FormData>(
    uploadImage,
    {
      status: FORM_STATUS.IDLE,
    },
  );

  useEffect(() => {
    if (state.status === FORM_STATUS.IDLE) return;
    if (state.status === FORM_STATUS.SUCCESS) {
      setOpen(false);
    }
    toast(state.message);
  }, [state]);

  return (
    <Form {...form}>
      <form action={formAction} id={formId}>
        <FormField
          control={form.control}
          name="userId"
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
          name="image"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { onChange, value: _value, ...field } }) => (
            <FormItem>
              <FormControl>
                <Input
                  id={inputId}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  multiple={false}
                  onChange={(e) => {
                    const file = getImageData(e);
                    setImageFile(file);
                    onChange(file);
                  }}
                  hidden
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.isValid && (
          <UploadImageDialog
            open={open}
            setOpen={setOpen}
            imageFile={imageFile}
            formId={formId}
          />
        )}
      </form>
    </Form>
  );
};

export default UploadImageForm;
