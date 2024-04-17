import {Component, Output} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatStepperModule, StepperOrientation} from '@angular/material/stepper';
import {map, Observable} from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe} from '@angular/common';
import {LeasingInfoComponentComponent} from './leasing-info-component/leasing-info-component.component';
import {type FinancialInfoFormGroup, LeasingInfo, type LeasingInfoFormGroup} from './types';
import {FinancialInfoComponent} from './financial-info/financial-info.component';
import {CalculatorComponent} from "../calculator/calculator.component";

/**
 * @title Stepper responsive
 */
@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss',
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
    LeasingInfoComponentComponent,
    FinancialInfoComponent,
    CalculatorComponent,
  ]
})
export class WizardComponent {
  wizardTitle = 'vRroom vRroom';
  @Output() leasingInfo!: LeasingInfo;


  firstFormGroup = this._formBuilder.group<LeasingInfoFormGroup>({
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(8000),
      Validators.max(120000)
    ]),
    downPayment: new FormControl<number | null>(null, Validators.required),
    calculatedDownPayment: new FormControl<number | null>({value: null, disabled: true}),
    residualValue: new FormControl<number | null>(null, Validators.required),
    calculatedResidualValue: new FormControl<number | null>({value: null, disabled: true}),
    period: new FormControl<number | null>(null, Validators.required),
    interestRate: new FormControl<number | null>({value: null, disabled: true})
  });

  secondFormGroup = this._formBuilder.group<FinancialInfoFormGroup>({
    employmentStatus: new FormControl<string | null>(null, Validators.required),
    employmentTerm: new FormControl<string | null>(null, Validators.required),
    monthlyIncome: new FormControl<number | null>(null, Validators.required),
    maritalStatus: new FormControl<string | null>(null, Validators.required),
    numberOfDependents: new FormControl<number | null>(null, [Validators.required, Validators.min(0), Validators.max(10)]),
    hasMonthlyObligations: new FormControl<boolean | null>(null, Validators.required),
    monthlyObligations: new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(100000)])
  });

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required]
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder,
              breakpointObserver: BreakpointObserver,
              calculator: CalculatorComponent) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    // this.leasingInfo = {
    //   amount: this.firstFormGroup.value.amount ?? 25000,
    //   downPayment: this.firstFormGroup.value.downPayment ?? 10,
    //   residualValue: this.firstFormGroup.value.residualValue ?? 0,
    //   period: this.firstFormGroup.value.period ?? 5,
    //   interestRate: this.firstFormGroup.value.interestRate ?? 0.5
    // }

    this.firstFormGroup.valueChanges.subscribe(value => {
      this.leasingInfo = {
        amount: value.amount ?? 8000,
        downPayment: value.downPayment ?? 10,
        residualValue: value.residualValue ?? 0,
        period: value.period ?? 5,
        interestRate: value.interestRate ?? 0.5
      }
    });
  }
}
