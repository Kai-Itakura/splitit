import { z } from 'zod';

export const updateEventSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1, 'イベント名は必須です。'),
    currency: z.string().min(1, '通貨は必須です。'),
  })
  .brand('update-event-schema');

export type UpdateEventSchema = z.infer<typeof updateEventSchema>;
