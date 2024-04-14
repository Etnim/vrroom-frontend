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

export interface FinancialInfoFormGroup {
  employmentStatus: FormControl<string | null>;
  employmentTerm: FormControl<string | null>;
  monthlyIncome: FormControl<number | null>;
  maritalStatus: FormControl<string | null>;
  numberOfDependents: FormControl<number | null>;
  hasMonthlyObligations: FormControl<boolean | null>;
  monthlyObligations: FormControl<number | null>;  
}

export interface VehicleInfoFormGroup {
  make: FormControl<string | null>;
  model: FormControl<string | null>;
  year: FormControl<number | null>;
  fuelType: FormControl<string | null>;
  emissions: FormControl<number | null>;
}
