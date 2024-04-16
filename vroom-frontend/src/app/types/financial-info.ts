import { z } from 'zod';

export const financialInfoSchema = z.object({
  id: z.number().int().positive(),
  monthlyIncome: z.number(),
  monthlyObligations: z.number(),
  maritalStatus: z.nativeEnum(MaritalStatus),
  dependants: z.number().int(),
});

export type FinancialInfo = z.infer<typeof financialInfoSchema>;

export enum MaritalStatus {
  SINGLE,
  MARRIED,
  DIVORCED,
  COHABITEE,
}

export const financialInfoInsertSchema = financialInfoSchema.omit({ id: true });
export type FinancialInfoInsert = z.infer<typeof financialInfoInsertSchema>;