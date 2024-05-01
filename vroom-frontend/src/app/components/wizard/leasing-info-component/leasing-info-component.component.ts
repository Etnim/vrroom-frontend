import {Component, Output} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe} from '@angular/common';
import {LeasingInfo, LeasingInfoFormGroup} from '../types';
import {CalculatorComponent} from "../calculator/calculator.component";
import { LeasingInfoService } from '../../../services/leasing-info.service';

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
    amount: new FormControl<number | null>(10000, [
      Validators.required,
      Validators.min(8000),
      Validators.max(120000)
    ]),
    downPayment: new FormControl<number | null>(10, Validators.required),
    calculatedDownPayment: new FormControl<number | null>({value: null, disabled: true}),
    residualValue: new FormControl<number | null>(30, Validators.required),
    calculatedResidualValue: new FormControl<number | null>({value: null, disabled: true}),
    period: new FormControl<number | null>(5, Validators.required),
    euriborRate: new FormControl<string | null>(null, Validators.required),
  });

  euriborRates: { label: string, value: string }[] = [
    { label: '3 Months', value: '3m' },
    { label: '6 Months', value: '6m' }
  ];
  selectedEuriborRate?: number;

  constructor(private _formBuilder: FormBuilder, private leasingService: LeasingInfoService) {
    this.leasingInfo = {
      amount: 10000,
      downPayment: 10,
      residualValue: 30,
      period: 5,
      interestRate: this.selectedEuriborRate ?? 0.538
    }

    this.firstFormGroup.valueChanges.subscribe(value =>
      this.leasingInfo = {
        amount: value.amount ?? 10000,
        downPayment: value.downPayment ?? 10,
        residualValue: value.residualValue ?? 30,
        period: value.period ?? 5,
        interestRate: this.selectedEuriborRate ?? 0.538
      })

      this.firstFormGroup.get('euriborRate')?.valueChanges.subscribe(term => {
        if (term){
        this.leasingService.getEuriborRate(term).subscribe({
          next: (rate) => {
            this.selectedEuriborRate = rate;
          },
          error: (error) => console.error('Error fetching Euribor rate:', error)
        });}
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
        this.firstFormGroup.patchValue({calculatedDownPayment});
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
        this.firstFormGroup.patchValue({calculatedResidualValue});
      }
    }
  }

  onAmountChange() {
    this.calculateDownPayment();
    this.calculateResidualValue();
  }

}
