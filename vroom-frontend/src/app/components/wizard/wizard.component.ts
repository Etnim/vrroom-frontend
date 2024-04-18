import { Component, Output, ViewChild, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup
} from '@angular/forms';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatStepperModule, StepperOrientation, MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { LeasingInfoComponentComponent } from './leasing-info-component/leasing-info-component.component';

import {
  type FinancialInfoFormGroup,
  type LeasingInfoFormGroup,
  type VehicleInfoFormGroup,
  type PersonalAndContactInfoFormGroup,
  type ReviewAndSubmitFormGroup,
  type CompleteFormData,
  LeasingInfo
} from './types';

import { FinancialInfoComponent } from './financial-info/financial-info.component';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonalContactInfoComponent } from './personal-contact-info/personal-contact-info.component';
import { ReviewAndSubmitComponent } from './review-and-submit/review-and-submit.component';
import { CalculatorComponent } from './calculator/calculator.component';

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
    VehicleInfoComponent,
    HttpClientModule,
    PersonalContactInfoComponent,
    ReviewAndSubmitComponent,
    CalculatorComponent,
    MatStepper
  ]
})
export class WizardComponent {
  wizardTitle = 'vRroom vRroom';
  @Output() leasingInfo!: LeasingInfo;

  @ViewChild('stepOne') stepOne!: LeasingInfoComponentComponent;
  @ViewChild('stepTwo') stepTwo!: FinancialInfoComponent;
  @ViewChild('stepThree') stepThree!: VehicleInfoComponent;
  ngAfterViewInit() {
    // console.log(this.stepOne.firstFormGroup);
  }

  print() {
    console.log(this.stepOne.firstFormGroup.value);
    console.log(this.stepTwo.secondFormGroup.value);
    console.log(this.stepThree.thirdFormGroup.value);
    console.log(this.stepThree.makeControl);
  }
  // @ViewChild('stepOne') leasingInfoComponent: LeasingInfoComponentComponent;

  // get frmStepOne(): Observable<FormGroup<any>> | null {
  //   return this.leasingInfoComponent?.frmStepOne$ ?? null;
  // }

  // ngAfterViewInit() {
  //   console.log(this.leasingInfoComponent);
  //   console.log(this.leasingInfoComponent?.firstFormGroup);
  // }
  // print() {
  //   console.log(this.leasingInfoComponent);
  //   console.log(this.leasingInfoComponent?.firstFormGroup);
  // }
  // firstFormGroup = this._formBuilder.group<LeasingInfoFormGroup>({
  //   amount: new FormControl<number | null>(null, [
  //     Validators.required,
  //     Validators.min(8000),
  //     Validators.max(120000)
  //   ]),
  //   downPayment: new FormControl<number | null>(null, Validators.required),
  //   calculatedDownPayment: new FormControl<number | null>({ value: null, disabled: true }),
  //   residualValue: new FormControl<number | null>(null, Validators.required),
  //   calculatedResidualValue: new FormControl<number | null>({ value: null, disabled: true }),
  //   period: new FormControl<number | null>(null, Validators.required)
  // });

  // secondFormGroup = this._formBuilder.group<FinancialInfoFormGroup>({
  //   employmentStatus: new FormControl<string | null>(null, Validators.required),
  //   employmentTerm: new FormControl<string | null>(null, Validators.required),
  //   monthlyIncome: new FormControl<number | null>(null, Validators.required),
  //   maritalStatus: new FormControl<string | null>(null, Validators.required),
  //   numberOfDependents: new FormControl<number | null>(null, [
  //     Validators.required,
  //     Validators.min(0),
  //     Validators.max(10)
  //   ]),
  //   hasMonthlyObligations: new FormControl<boolean | null>(null, Validators.required),
  //   monthlyObligations: new FormControl<number | null>(null, [
  //     Validators.required,
  //     Validators.min(1),
  //     Validators.max(100000)
  //   ])
  // });

  // thirdFormGroup = this._formBuilder.group<VehicleInfoFormGroup>({
  //   make: new FormControl<string | null>(null, Validators.required),
  //   model: new FormControl<string | null>(null, Validators.required),
  //   year: new FormControl<number | null>(null, [
  //     Validators.required,
  //     Validators.min(2010),
  //     Validators.max(2024)
  //   ]),
  //   fuelType: new FormControl<string | null>(null, Validators.required),
  //   emissions: new FormControl<number | null>(null, Validators.required)
  // });

  // fourthFormGroup = this._formBuilder.group<PersonalAndContactInfoFormGroup>({
  //   name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
  //   surname: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
  //   dateOfBirth: new FormControl<string | null>(null, [Validators.required]), // @TODO: Date format?
  //   identificationNumber: new FormControl<string | null>(null, [
  //     Validators.required,
  //     Validators.pattern('[1-6]{1}[0-9]{10}')
  //   ]),
  //   email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
  //   phoneNumber: new FormControl<string | null>(null, [
  //     Validators.required,
  //     Validators.pattern('[+0-9]{9,13}$')
  //   ]),
  //   address: new FormControl<string | null>(null, Validators.required),
  //   city: new FormControl<string | null>(null, Validators.required),
  //   postalCode: new FormControl<string | null>(null, [
  //     Validators.required,
  //     Validators.pattern('^(LT)?[0-9]{5}$')
  //   ])
  // });
  // fifthFormGroup = this._formBuilder.group<ReviewAndSubmitFormGroup>({
  //   reviewConfirm: new FormControl<boolean | null>(null, Validators.required)
  // });

  // wizardFormGroup = this._formBuilder.group<CompleteFormData>({
  //   ...this.firstFormGroup.controls,
  //   ...this.secondFormGroup.controls,
  //   ...this.thirdFormGroup.controls,
  //   ...this.fourthFormGroup.controls,
  //   ...this.fifthFormGroup.controls
  // });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(breakpointObserver: BreakpointObserver, private fb: FormBuilder) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
}
