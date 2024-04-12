import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import type { LeasingInfoFormGroup } from '../types';

@Component({
  selector: 'app-leasing-info-component',
  standalone: true,
  imports: [
    LeasingInfoComponentComponent,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './leasing-info-component.component.html',
  styleUrl: './leasing-info-component.component.scss'
})
export class LeasingInfoComponentComponent {
  @Input() formGroup!: FormGroup<LeasingInfoFormGroup>;

  downPaymentOptions = [10, 20, 30, 40, 50, 60];
  residualValueOptions = [0, 5, 10, 15, 20, 25, 30];
  periodOptions = [1, 2, 3, 4, 5, 6, 7];

  ngOnInit() {
    // Fetch interest rate using API
  }

  calculateDownPayment() {
    const amountControl = this.formGroup.get('amount');
    const downPaymentControl = this.formGroup.get('downPayment');

    if (amountControl && downPaymentControl) {
      const amount = amountControl.value;
      const downPayment = downPaymentControl.value;

      if (amount !== null && downPayment !== null) {
        const calculatedDownPayment = (amount * downPayment) / 100;
        this.formGroup.patchValue({ calculatedDownPayment });
      }
    }
  }

  calculateResidualValue() {
    const amountControl = this.formGroup.get('amount');
    const residualValueControl = this.formGroup.get('residualValue');

    if (amountControl && residualValueControl) {
      const amount = amountControl.value;
      const residualValue = residualValueControl.value;

      if (amount !== null && residualValue !== null) {
        const calculatedResidualValue = (amount * residualValue) / 100;
        this.formGroup.patchValue({ calculatedResidualValue });
      }
    }
  }

  onAmountChange() {
    this.calculateDownPayment();
    this.calculateResidualValue();
  }
}
