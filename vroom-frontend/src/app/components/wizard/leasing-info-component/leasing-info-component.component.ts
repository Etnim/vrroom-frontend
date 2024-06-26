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
import { LeasingInfoService } from '../../../services/leasing-info.service';
import {MatCard} from "@angular/material/card";

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
    CalculatorComponent,
    MatCard
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
    period: new FormControl<number | null>(null, Validators.required),
    euriborRate: new FormControl<string | null>(null, Validators.required),
    selectedEuriborRate: new FormControl<number | null>(null, Validators.required)
  });

  euriborRates: { label: string; value: string }[] = [
    { label: '3 Months', value: '3m' },
    { label: '6 Months', value: '6m' }
  ];
  selectedEuriborRate?: number;
  calculatedDownPayment?: number;
  calculatedResidualValue?: number;

  constructor(private _formBuilder: FormBuilder, private leasingService: LeasingInfoService) {
    this.firstFormGroup.valueChanges.subscribe(
      (value) =>
        (this.leasingInfo = {
          amount: value.amount!,
          downPayment: value.downPayment!,
          residualValue: value.residualValue!,
          period: value.period!,
          interestRate: value.selectedEuriborRate!
        })
    );

    this.firstFormGroup.get('euriborRate')?.valueChanges.subscribe((term) => {
      if (term) {
        this.leasingService.getEuriborRate(term).subscribe({
          next: (rate) => {
            this.firstFormGroup.patchValue({ selectedEuriborRate: rate });
            this.selectedEuriborRate = rate;
          },
          error: (error) => console.error('Error fetching Euribor rate:', error)
        });
      }
    });
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
        this.calculatedDownPayment = calculatedDownPayment;
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
        this.calculatedResidualValue = calculatedResidualValue;
        this.firstFormGroup.patchValue({ calculatedResidualValue });
      }
    }
  }

  onAmountChange() {
    this.calculateDownPayment();
    this.calculateResidualValue();
  }
}
