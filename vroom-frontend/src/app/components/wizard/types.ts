import { FormControl, FormGroup } from '@angular/forms';

export interface LeasingInfoFormGroup {
  amount: FormControl<number | null>;
  downPayment: FormControl<number | null>;
  calculatedDownPayment: FormControl<number | null>;
  residualValue: FormControl<number | null>;
  calculatedResidualValue: FormControl<number | null>;
  period: FormControl<number | null>;
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
  monthly: number;
  fee: number;
}

export interface VehicleInfoFormGroup {
  brand: FormControl<string | null>;
  model: FormControl<string | null>;
  year: FormControl<number | null>;
  fuel: FormControl<string | null>;
}

export interface EmissionRangeFormGroup {
  emissionStart: FormControl<number | null>;
  emissionEnd: FormControl<number | null>;
}

export interface PersonalAndContactInfoFormGroup {
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
  dateOfBirth: FormControl<string | null>;
  identificationNumber: FormControl<string | null>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  address: FormControl<string | null>;
}

export interface ReviewAndSubmitFormGroup {
  reviewConfirm: FormControl<boolean | null>;
}

export interface Customer {
  name: string;
  surname: string;
  email: string;
  birthDate: string; // ISO date string
  phone: string;
  address: string;
}

export interface VehicleDetails {
  brand: string;
  model: string;
  year: number;
  fuel: 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';
  emissionStart: number;
  emissionEnd: number;
}

export interface FinancialInfo {
  monthlyIncome: number;
  monthlyObligations: number;
  maritalStatus: 'SINGLE' | 'MARRIED' | 'WIDOWED' | 'DIVORCED';
  dependants: number;
}

export interface RequestBody {
  customer: Customer;
  vehicleDetails: VehicleDetails[];
  financialInfo: FinancialInfo;
  price: number;
  downPayment: number;
  residualValue: number;
  yearPeriod: number;
}
// export interface CompleteFormData {
//   leasingInfo: LeasingInfoFormGroup;
//   financialInfo: FinancialInfoFormGroup;
//   vehicleInfo: VehicleInfoFormGroup;
//   personalInfo: PersonalAndContactInfoFormGroup;

// }

export type CompleteFormData = LeasingInfoFormGroup &
  FinancialInfoFormGroup &
  VehicleInfoFormGroup &
  PersonalAndContactInfoFormGroup &
  ReviewAndSubmitFormGroup;
