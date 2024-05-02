import { Component } from '@angular/core';
import type { FinancialInfoFormGroup } from '../types';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';

const disposableIncomeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const monthlyIncome = control.get('monthlyIncome')?.value;
  const monthlyObligations = control.get('monthlyObligations')?.value;
  const numberOfDependents = control.get('numberOfDependents')?.value;

  if (monthlyIncome !== null && monthlyObligations !== null && numberOfDependents !== null) {
    const disposableIncome = monthlyIncome - monthlyObligations - 60 * numberOfDependents;
    if (disposableIncome < 0) {
      return { insufficientDisposableIncome: true };
    }
  }

  return null;
};

@Component({
  selector: 'app-financial-info',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    AsyncPipe
  ],
  templateUrl: './financial-info.component.html',
  styleUrl: './financial-info.component.scss'
})
export class FinancialInfoComponent {
  constructor(private _formBuilder: FormBuilder) {}

  secondFormGroup = this._formBuilder.group<FinancialInfoFormGroup>(
    {
      employmentStatus: new FormControl<string | null>(null, Validators.required),
      employmentTerm: new FormControl<string | null>(null, Validators.required),
      monthlyIncome: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      maritalStatus: new FormControl<string | null>(null, Validators.required),
      numberOfDependents: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(10)
      ]),
      hasMonthlyObligations: new FormControl<boolean | null>(null, Validators.required),
      monthlyObligations: new FormControl<number>(0, [Validators.min(0), Validators.max(100000)])
    },
    { validators: disposableIncomeValidator }
  );

  employmentStatusOptions = ['Full-time', 'Part-time', 'Self-employed', 'Unemployed'];
  employmentTermOptions = [
    'Less than 1 year',
    '1 year',
    '2 years',
    '3 years',
    '4 years',
    '5 years',
    'More than 5 years'
  ];
  maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Cohabitee'];
}
