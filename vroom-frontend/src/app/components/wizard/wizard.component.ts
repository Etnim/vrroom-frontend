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

import { type ReviewAndSubmitFormGroup, type CompleteFormData, LeasingInfo } from './types';

import { FinancialInfoComponent } from './financial-info/financial-info.component';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonalContactInfoComponent } from './personal-contact-info/personal-contact-info.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { MatCardModule } from '@angular/material/card';
import type { RequestBody, FinancialInfo, VehicleDetails, Customer } from './types';

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
    CalculatorComponent,
    MatStepper,
    MatCardModule
  ]
})
export class WizardComponent {
  wizardTitle = 'vRroom vRroom';
  @Output() leasingInfo!: LeasingInfo;

  @ViewChild('stepOne') stepOne!: LeasingInfoComponentComponent;
  @ViewChild('stepTwo') stepTwo!: FinancialInfoComponent;
  @ViewChild('stepThree') stepThree!: VehicleInfoComponent;
  @ViewChild('stepFour') stepFour!: PersonalContactInfoComponent;

  ngAfterViewInit() {
    // console.log(this.stepOne.firstFormGroup);
  }

  print() {
    console.log(this.stepOne.firstFormGroup.value);
    console.log(this.stepTwo.secondFormGroup.value);
    console.log(this.stepThree.thirdFormGroup.value);
    console.log(this.stepThree.emissionRangeForm.value);
    console.log(this.stepFour.fourthFormGroup.value);
  }

  submit() {
    const requestBody: RequestBody = {
      customer: {
        name: 'GreIXpYqAZwLEvCDJqfMmPtwm',
        surname: 'SfGLYOvGayLeDqwLGyafKVhfs',
        email: 'john.doe@example.com',
        birthDate: '2024-04-18T10:16:05.006Z',
        phone: '+370280571581',
        address: 'string'
      },
      vehicleDetails: [
        {
          brand: 'string',
          model: 'string',
          year: 1885,
          fuel: 'PETROL',
          emissionStart: 0,
          emissionEnd: 12
        }
      ],
      financialInfo: {
        monthlyIncome: 1,
        monthlyObligations: 1,
        maritalStatus: 'SINGLE',
        dependants: 0
      },
      price: 0.01,
      downPayment: 0,
      residualValue: 0,
      yearPeriod: 1
    };
  }

  // get frmStepOne(): Observable<FormGroup<any>> | null {
  //   return this.leasingInfoComponent?.frmStepOne$ ?? null;
  // }

  // wizardFormGroup = this._formBuilder.group<CompleteFormData>({
  //   ...this.firstFormGroup.controls,
  //   ...this.secondFormGroup.controls,
  //   ...this.thirdFormGroup.controls,
  //   ...this.fourthFormGroup.controls,
  //   ...this.fifthFormGroup.controls
  // });

  fifthFormGroup = this._formBuilder.group<ReviewAndSubmitFormGroup>({
    reviewConfirm: new FormControl<boolean | null>(null, Validators.required)
  });

  get formData() {
    return this.fifthFormGroup.value;
  }

  submitReviewedForm() {
    console.log('Submitted:', this.fifthFormGroup.value);
  }

  isFormFilled: boolean = false;

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private _formBuilder: FormBuilder
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
}
