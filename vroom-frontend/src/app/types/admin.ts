import { z } from 'zod';

export const adminSchema = z.object({
  id: z.number().int().positive(),
  applications: z.array(z.lazy(() => applicationSchema)),
});

export type Admin = z.infer<typeof adminSchema>;