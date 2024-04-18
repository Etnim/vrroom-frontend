import { z } from 'zod';

export const customerSchema = z.object({
  pid: z.number().int().positive(),
  name: z.string(),
  surname: z.string(),
  birthDate: z.date(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string()
});

export type Customer = z.infer<typeof customerSchema>;

export const customerInsertSchema = customerSchema.omit({ pid: true });
export type CustomerInsert = z.infer<typeof customerInsertSchema>;
