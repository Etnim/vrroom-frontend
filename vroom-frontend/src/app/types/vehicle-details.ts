import { z } from 'zod';

export const vehicleDetailsSchema = z.object({
  id: z.number().int().positive(),
  brand: z.string(),
  model: z.string(),
  year: z.number().int(),
  fuel: z.nativeEnum(FuelType),
  emission: z.number().int(),
  application: z.lazy(() => applicationSchema),
});

export type VehicleDetails = z.infer<typeof vehicleDetailsSchema>;

export enum FuelType {
  PETROL,
  DIESEL,
  ELECTRIC,
  HYBRID,
}

export const vehicleDetailsInsertSchema = vehicleDetailsSchema.omit({ id: true });
export type VehicleDetailsInsert = z.infer<typeof vehicleDetailsInsertSchema>;