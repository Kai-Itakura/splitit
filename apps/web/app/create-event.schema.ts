import { z } from 'zod';

export const createEventSchema = z
  .object({
    title: z.string().min(1, 'イベント名は必須です。'),
    currency: z.string().min(1, '通貨は必須です。'),
  })
  .brand('create-event-schema');

export type CreateEventSchema = z.infer<typeof createEventSchema>;
