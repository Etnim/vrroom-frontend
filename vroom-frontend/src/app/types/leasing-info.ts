import { z } from 'zod';

const leasingInfoSchema = z.object({
  price: z.number().positive(),
  downPayment: z.number().positive().max(100),
  residualValue: z.number().positive().max(100),
  yearPeriod: z.number().positive().int(),
  euribor: z.enum(['3m', '6m'])
});

export type LeasingInfo = z.infer<typeof leasingInfoSchema>;

export function mapFormValueToLeasingInfoInsert(formValue: {
  amount: number | null;
  downPayment: number | null;
  calculatedDownPayment: number | null;
  residualValue: number | null;
  calculatedResidualValue: number | null;
  period: number | null;
  euriborRate: string | null;
}): LeasingInfo {
  return {
    price: formValue.amount!,
    downPayment: formValue.downPayment!,
    residualValue: formValue.residualValue!,
    yearPeriod: formValue.period!,
    euribor: formValue.euriborRate! as '3m' | '6m'
  };
}
