import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatStepper, MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { LeasingInfoComponentComponent } from './leasing-info-component/leasing-info-component.component';
import { type ReviewAndSubmitFormGroup } from './types';
import { FinancialInfoComponent } from './financial-info/financial-info.component';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonalContactInfoComponent } from './personal-contact-info/personal-contact-info.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import type { CustomerData } from '../../types/requests';
import { mapFormValueToCustomerInsert, type CustomerInsert } from '../../types/customer';
import { mapFormValueToVehicleDetailsInsert } from '../../types/vehicle-details';
import { mapFormValueToFinancialInfoInsert } from '../../types/financial-info';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';

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

  submit() {
    const requestBody: CustomerData = {
      customer: mapFormValueToCustomerInsert(this.stepFour.fourthFormGroup.getRawValue()),
      vehicleDetails:
        mapFormValueToVehicleDetailsInsert(
          this.stepThree.thirdFormGroup.getRawValue(),
          this.stepThree.emissionRangeForm.getRawValue()
        )
      ,
      financialInfo: mapFormValueToFinancialInfoInsert(this.stepTwo.secondFormGroup.getRawValue()),
      price: this.stepOne.firstFormGroup.value.amount!,
      downPayment: this.stepOne.firstFormGroup.value.downPayment!,
      residualValue: this.stepOne.firstFormGroup.value.residualValue!,
      yearPeriod: this.stepOne.firstFormGroup.value.period!
    };

    console.log(requestBody);

    this.applicationService.submitData(requestBody).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/submission-success']);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
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
    private _formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 300px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  navigateToMain(){
    this.router.navigate(['']);
  }
}
