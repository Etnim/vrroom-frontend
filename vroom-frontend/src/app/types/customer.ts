import { z } from 'zod';
import type { PersonalAndContactInfoFormGroup } from '../components/wizard/types';
import moment from 'moment';

export const customerSchema = z.object({
  personalId: z.number().int().positive(),
  name: z.string(),
  surname: z.string(),
  birthDate: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string()
});

export type Customer = z.infer<typeof customerSchema>;

// export const customerInsertSchema = customerSchema.omit({ pid: true });
export type CustomerInsert = z.infer<typeof customerSchema>;

export function mapFormValueToCustomerInsert(formValue: {
  name: string | null;
  surname: string | null;
  dateOfBirth: string | null;
  identificationNumber: string | null;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
}): CustomerInsert {
  const birthDate = moment(formValue.dateOfBirth, 'YYYY-MM-DD').format('YYYY-MM-DD');

  return {
    personalId: parseInt(formValue.identificationNumber!),
    name: formValue.name!,
    surname: formValue.surname!,
    birthDate: birthDate,
    email: formValue.email!,
    phone: formValue.phoneNumber!,
    address: formValue.address!
  };
}
