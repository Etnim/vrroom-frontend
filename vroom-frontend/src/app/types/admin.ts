import { z } from 'zod';
import { applicationSchema } from './application';

export const adminSchema = z.object({
  id: z.number().int().positive(),
  applications: z.array(z.lazy(() => applicationSchema))
});

export type Admin = z.infer<typeof adminSchema>;

export const adminInsertSchema = adminSchema.omit({ applications: true });
