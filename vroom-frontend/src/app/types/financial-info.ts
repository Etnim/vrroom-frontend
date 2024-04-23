import { z } from 'zod';

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  COHABITEE = 'COHABITEE'
}

export enum EmploymentStatus {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
  SELFEMPLOYED = 'SELFEMPLOYED',
  UNEMPLOYED = 'UNEMPLOYED'
}

export const financialInfoSchema = z.object({
  id: z.number().int().positive(),
  monthlyIncome: z.number(),
  monthlyObligations: z.number(),
  maritalStatus: z
    .string()
    .refine((val) => Object.values(MaritalStatus).includes(val as MaritalStatus), {
      message: 'Invalid marital status'
    }),
  employmentStatus: z.string(),
  employmentTerm: z.number().int(),
  dependants: z.number().int()
});

export type FinancialInfo = z.infer<typeof financialInfoSchema>;

export const financialInfoInsertSchema = financialInfoSchema.omit({ id: true });

export type FinancialInfoInsert = z.infer<typeof financialInfoInsertSchema>;

export function mapFormValueToFinancialInfoInsert(formValue: {
  employmentStatus: string | null;
  employmentTerm: string | null;
  monthlyIncome: number | null;
  maritalStatus: string | null;
  numberOfDependents: number | null;
  hasMonthlyObligations: boolean | null;
  monthlyObligations: number | null;
}): FinancialInfoInsert {
  let monthlyObligations = 0;
  if (formValue.hasMonthlyObligations!) {
    monthlyObligations = formValue.monthlyObligations ?? 0;
  }

  return {
    monthlyIncome: formValue.monthlyIncome!,
    monthlyObligations: monthlyObligations,
    maritalStatus: formValue.maritalStatus!.toUpperCase(),
    employmentStatus: formValue.employmentStatus!.split('-').join('').toUpperCase(),
    employmentTerm: parseInt(formValue.employmentTerm!),
    dependants: formValue.numberOfDependents!
  };
}
