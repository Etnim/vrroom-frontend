import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl
} from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, MatStepperModule } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { LeasingInfoComponentComponent } from './leasing-info-component/leasing-info-component.component';
import { type FinancialInfoFormGroup, type LeasingInfoFormGroup, type PersonalAndContactInfoFormGroup } from './types';
import { FinancialInfoComponent } from './financial-info/financial-info.component';
import { PersonalContactInfoComponent } from './personal-contact-info/personal-contact-info.component';

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
    PersonalContactInfoComponent,
  ]
})
export class WizardComponent {
  wizardTitle = 'vRroom vRroom';

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
    interestRate: new FormControl<number | null>({ value: null, disabled: true })
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

  fourthFormGroup = this._formBuilder.group<PersonalAndContactInfoFormGroup>({
    name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
    surname: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
    dateOfBirth: new FormControl<string | null>(null, [Validators.required]), // @TODO: Date format?
    identificationNumber: new FormControl<string | null>(null, [Validators.required, Validators.pattern('[1-6]{1}[0-9]{10}')]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl<string | null>(null, [Validators.required, Validators.pattern('[+0-9]{9,13}')]),
    address: new FormControl<string | null>(null, Validators.required),
    city: new FormControl<string | null>(null, Validators.required),
    postalCode: new FormControl<string | null>(null, [Validators.required, Validators.pattern('^(LT)?[0-9]{5}$')]),
  });
  fifthFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required]
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
}
