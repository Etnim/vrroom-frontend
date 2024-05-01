import { Component, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { LeasingInfo, LeasingInfoFormGroup } from '../types';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
  selector: 'app-leasing-info-component',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    CalculatorComponent
  ],
  templateUrl: './leasing-info-component.component.html',
  styleUrl: './leasing-info-component.component.scss'
})
export class LeasingInfoComponentComponent {
  @Output() leasingInfo!: LeasingInfo;

  firstFormGroup = this._formBuilder.group<LeasingInfoFormGroup>({
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(8000),
      Validators.max(120000)
    ]),
    downPayment: new FormControl<number | null>(null, Validators.required),
    calculatedDownPayment: new FormControl<number | null>({ value: null, disabled: true }),
    residualValue: new FormControl<number | null>(null, Validators.required),
    calculatedResidualValue: new FormControl<number | null>({ value: null, disabled: true }),
    period: new FormControl<number | null>(null, Validators.required)
  });

  constructor(private _formBuilder: FormBuilder) {
    this.leasingInfo = {
      amount: 10000,
      downPayment: 10,
      residualValue: 30,
      period: 5,
      interestRate: 0.538
    };

    this.firstFormGroup.valueChanges.subscribe(
      (value) =>
        (this.leasingInfo = {
          amount: value.amount ?? 10000,
          downPayment: value.downPayment ?? 10,
          residualValue: value.residualValue ?? 30,
          period: value.period ?? 5,
          interestRate: 0.538
        })
    );
  }

  downPaymentOptions = [10, 20, 30, 40, 50, 60];
  residualValueOptions = [0, 5, 10, 15, 20, 25, 30];
  periodOptions = [1, 2, 3, 4, 5, 6, 7];

  calculateDownPayment() {
    const amountControl = this.firstFormGroup.get('amount');
    const downPaymentControl = this.firstFormGroup.get('downPayment');

    if (amountControl && downPaymentControl) {
      const amount = amountControl.value;
      const downPayment = downPaymentControl.value;

      if (amount !== null && downPayment !== null) {
        const calculatedDownPayment = (amount * downPayment) / 100;
        this.firstFormGroup.patchValue({ calculatedDownPayment });
      }
    }
  }

  calculateResidualValue() {
    const amountControl = this.firstFormGroup.get('amount');
    const residualValueControl = this.firstFormGroup.get('residualValue');

    if (amountControl && residualValueControl) {
      const amount = amountControl.value;
      const residualValue = residualValueControl.value;

      if (amount !== null && residualValue !== null) {
        const calculatedResidualValue = (amount * residualValue) / 100;
        this.firstFormGroup.patchValue({ calculatedResidualValue });
      }
    }
  }

  onAmountChange() {
    this.calculateDownPayment();
    this.calculateResidualValue();
  }
}
