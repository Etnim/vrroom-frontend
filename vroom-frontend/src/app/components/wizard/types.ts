import { FormControl } from '@angular/forms';

export interface LeasingInfoFormGroup {
  amount: FormControl<number | null>;
  downPayment: FormControl<number | null>;
  calculatedDownPayment: FormControl<number | null>;
  residualValue: FormControl<number | null>;
  calculatedResidualValue: FormControl<number | null>;
  period: FormControl<number | null>;
  interestRate: FormControl<number | null>;
}
export interface LeasingInfo {
  amount: number;
  downPayment: number;
  residualValue: number;
  period: number;
  interestRate: number;
}

export interface FinancialInfoFormGroup {
  employmentStatus: FormControl<string | null>;
  employmentTerm: FormControl<string | null>;
  monthlyIncome: FormControl<number | null>;
  maritalStatus: FormControl<string | null>;
  numberOfDependents: FormControl<number | null>;
  hasMonthlyObligations: FormControl<boolean | null>;
  monthlyObligations: FormControl<number | null>;
}

export interface Calculator {
  monthly: number,
  fee: number
}

export interface VehicleInfoFormGroup {
  make: FormControl<string | null>;
  model: FormControl<string | null>;
  year: FormControl<number | null>;
  fuelType: FormControl<string | null>;
  emissions: FormControl<number | null>;
}

export interface PersonalAndContactInfoFormGroup {
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
<<<<<<< HEAD
  dateOfBirth: FormControl<string | null>;
  identificationNumber: FormControl<string | null>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  address: FormControl<string | null>;
  city: FormControl<string | null>;
  postalCode: FormControl<string | null>;
=======
  dob: FormControl<string | null>;
  identificationNumber: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  address: FormControl<string | null>;
  city: FormControl<string | null>;
  postalCode: FormControl<string | null>;
  country: FormControl<string | null>;
>>>>>>> a259e64 (merge dev)
}

