import { z } from 'zod';

enum FuelType {
  PETROL = 'Petrol',
  DIESEL = 'Diesel',
  ELECTRIC = 'Electric',
  HYBRID = 'Hybrid'
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

export function mapFormValueToVehicleDetailsInsert(formValue: {
  brand: string | null;
  model: string | null;
  year: number | null;
  fuel: string | null;
  emission: number | null;
}): VehicleDetailsInsert {
  const fuelValueCorrected = formValue.fuel
    ? formValue.fuel.charAt(0).toUpperCase() + formValue.fuel.slice(1).toLowerCase()
    : null;

  if (!fuelValueCorrected || !Object.values(FuelType).includes(fuelValueCorrected as FuelType)) {
    throw new Error(`Invalid fuel type: ${formValue.fuel}`);
  }

  let emissionStart = 0;
  let emissionEnd = 0;

  if (formValue.emission !== null) {
    switch (true) {
      case formValue.emission <= 10:
        emissionStart = 0;
        emissionEnd = 10;
        break;
      case formValue.emission <= 30:
        emissionStart = 10;
        emissionEnd = 30;
        break;
      case formValue.emission <= 50:
        emissionStart = 30;
        emissionEnd = 50;
        break;
      case formValue.emission <= 70:
        emissionStart = 50;
        emissionEnd = 70;
        break;
      case formValue.emission <= 90:
        emissionStart = 70;
        emissionEnd = 90;
        break;
      case formValue.emission <= 110:
        emissionStart = 90;
        emissionEnd = 110;
        break;
      default:
        emissionStart = 110;
        emissionEnd = 130;
    }
  }

  return {
    brand: formValue.brand!,
    model: formValue.model!,
    year: Math.floor(formValue.year!),
    fuel: fuelValueCorrected,
    emissionStart: emissionStart,
    emissionEnd: emissionEnd
  };
}
