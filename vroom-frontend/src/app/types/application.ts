import { z } from 'zod';

export const applicationSchema = z.object({
  id: z.number().int().positive(),
  financialInfo: z.lazy(() => financialInfoSchema),
  customer: z.lazy(() => customerSchema),
  vehicleDetails: z.array(z.lazy(() => vehicleDetailsSchema)),
  manager: z.lazy(() => adminSchema),
  price: z.number(),
  downPayment: z.number().int(),
  residualValue: z.number().int(),
  yearPeriod: z.number().int(),
  interestRate: z.number(),
  status: z.nativeEnum(AppStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Application = z.infer<typeof applicationSchema>;

export enum AppStatus {
  SUBMITTED,
  UNDER_REVIEW,
  PENDING_CHANGES,
  PENDING_REVIEW,
  WAITING_FOR_SIGNING,
  SIGNED,
  REJECTED,
  CANCELLED,
}

export const applicationInsertSchema = applicationSchema.omit({ id: true });
export type ApplicationInsert = z.infer<typeof applicationInsertSchema>;