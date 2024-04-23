import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {BreakpointObserver} from '@angular/cdk/layout';
import {MatStepper, MatStepperModule, StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe} from '@angular/common';
import {LeasingInfoComponentComponent} from './leasing-info-component/leasing-info-component.component';

import type {RequestBody} from './types';
import {type ReviewAndSubmitFormGroup} from './types';

import {FinancialInfoComponent} from './financial-info/financial-info.component';
import {VehicleInfoComponent} from './vehicle-info/vehicle-info.component';
import {HttpClientModule} from '@angular/common/http';
import {PersonalContactInfoComponent} from './personal-contact-info/personal-contact-info.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {MatCardModule} from '@angular/material/card';
import {MatCheckbox} from "@angular/material/checkbox";

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
    MatCardModule,
    MatCheckbox
  ]
})
export class WizardComponent {
  wizardTitle = 'vRroom vRroom';

  @ViewChild('stepOne') stepOne!: LeasingInfoComponentComponent;
  @ViewChild('stepTwo') stepTwo!: FinancialInfoComponent;
  @ViewChild('stepThree') stepThree!: VehicleInfoComponent;
  @ViewChild('stepFour') stepFour!: PersonalContactInfoComponent;

  ngAfterViewInit() {
    // console.log(this.stepOne.firstFormGroup);
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
      .observe('(min-width: 300px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
}
