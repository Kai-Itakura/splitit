import { z } from 'zod';

const MIME_TYPES = ['image/png', 'image/jpeg'];
const MAX_SIZE = 1024 * 1024; // 1MB

export const profileImageSchema = z
  .object({
    userId: z.string().min(1, { message: 'ユーザーIDは必須です。' }),
    image: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_SIZE, {
        message: 'ファイルサイズは1MB以下である必要があります。',
      })
      .refine((file) => MIME_TYPES.includes(file.type), {
        message: 'jpegまたはpngのみアップロード可能です。',
      }),
  })
  .brand('profile-image-schema');

export type ProfileImageSchema = z.infer<typeof profileImageSchema>;
