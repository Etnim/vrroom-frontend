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
import type { LeasingInfoFormGroup } from './types';
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
    LeasingInfoComponentComponent
  ]
})
export class WizardComponent {
  wizardTitle = 'SOME TITLE, AND INFO';

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

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required]
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
}
