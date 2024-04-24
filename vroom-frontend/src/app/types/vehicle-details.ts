import { z } from 'zod';

enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID'
}

export const vehicleDetailsSchema = z.object({
  id: z.number().int().positive(),
  brand: z.string(),
  model: z.string(),
  year: z.number().int(),
  fuel: z.string().refine((val) => Object.values(FuelType).includes(val as FuelType), {
    message: 'Invalid marital status'
  }),
  emissionStart: z.number().int(),
  emissionEnd: z.number().int()
});

export type VehicleDetails = z.infer<typeof vehicleDetailsSchema>;

export const vehicleDetailsInsertSchema = vehicleDetailsSchema.omit({ id: true });
export type VehicleDetailsInsert = z.infer<typeof vehicleDetailsInsertSchema>;

export function mapFormValueToVehicleDetailsInsert(
  formValue: {
    brand: string | null;
    model: string | null;
    year: number | null;
    fuel: string | null;
  },
  emissionForm: {
    emissionStart: number | null;
    emissionEnd: number | null;
  }
): VehicleDetailsInsert {
  if (formValue.fuel === null) {
    throw new Error('Invalid fuel type');
  }

  return {
    brand: formValue.brand!,
    model: formValue.model!,
    year: Math.floor(formValue.year!),
    fuel: formValue.fuel.toUpperCase(),
    emissionStart: emissionForm.emissionStart!,
    emissionEnd: emissionForm.emissionEnd!
  };
}
