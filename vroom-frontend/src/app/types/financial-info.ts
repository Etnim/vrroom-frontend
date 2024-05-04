import { z } from 'zod';

export enum MaritalStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  DIVORCED = 'Divorced',
  COHABITEE = 'Cohabitee'
}

export enum EmploymentStatus {
  FULLTIME = 'Full-time',
  PARTTIME = 'Part-time',
  SELFEMPLOYED = 'Self-emplyoyed',
  UNEMPLOYED = 'Unemployed'
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
  employmentTerm: z.string(),
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

  const maritalStatusFormatted = formValue.maritalStatus
    ? formValue.maritalStatus.charAt(0).toUpperCase() +
      formValue.maritalStatus.slice(1).toLowerCase()
    : null;
  if (
    !maritalStatusFormatted ||
    !Object.values(MaritalStatus).includes(maritalStatusFormatted as MaritalStatus)
  ) {
    throw new Error(`Invalid marital status: ${formValue.maritalStatus}`);
  }

  return {
    monthlyIncome: formValue.monthlyIncome!,
    monthlyObligations: monthlyObligations,
    maritalStatus: maritalStatusFormatted,
    employmentStatus: formValue.employmentStatus!,
    employmentTerm: formValue.employmentTerm!,
    dependants: formValue.numberOfDependents!
  };
}
