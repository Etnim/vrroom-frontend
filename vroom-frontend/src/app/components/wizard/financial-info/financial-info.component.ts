import { Component, Input, OnInit } from '@angular/core';
import type { FinancialInfoFormGroup } from '../types';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-financial-info',
  standalone: true,
  imports: [
    FinancialInfoComponent,
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
  // @Input() formGroup!: FormGroup<FinancialInfoFormGroup>;
  constructor(private _formBuilder: FormBuilder) {}

  secondFormGroup = this._formBuilder.group<FinancialInfoFormGroup>({
    employmentStatus: new FormControl<string | null>(null, Validators.required),
    employmentTerm: new FormControl<string | null>(null, Validators.required),
    monthlyIncome: new FormControl<number | null>(null, Validators.required),
    maritalStatus: new FormControl<string | null>(null, Validators.required),
    numberOfDependents: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(10)
    ]),
    hasMonthlyObligations: new FormControl<boolean | null>(null, Validators.required),
    monthlyObligations: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(100000)
    ])
  });

  employmentStatusOptions = ['Full-time', 'Part-time', 'Self-employed'];
  employmentTermOptions = [
    'Less than 1 year',
    '1 year',
    '2 years',
    '3 years',
    '4 years',
    '5 years',
    'More than 5 years'
  ];
  maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed'];
  // hasMonthlyObligationsOptions = [true, false];
}
