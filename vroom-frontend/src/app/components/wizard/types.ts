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
