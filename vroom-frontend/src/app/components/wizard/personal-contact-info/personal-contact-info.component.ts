import { Component } from '@angular/core';
import type { PersonalAndContactInfoFormGroup } from '../types';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

@Component({
  selector: 'app-personal-contact-info',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    MatSelectModule
  ],
  providers: [provideNativeDateAdapter(),
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  templateUrl: './personal-contact-info.component.html',
  styleUrls: ['./personal-contact-info.component.scss']
})
export class PersonalContactInfoComponent {
  fourthFormGroup = this._formBuilder.group<PersonalAndContactInfoFormGroup>({
    name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
    surname: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
    dateOfBirth: new FormControl<string | null>(null, [Validators.required]),
    identificationNumber: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern('[1-6]{1}[0-9]{10}')
    ]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl<string | null>(null, [Validators.required]),
    address: new FormControl<string | null>(null, Validators.required)
  });

  minDate: Date;
  maxDate: Date;

  constructor(private fb: FormBuilder, private _formBuilder: FormBuilder) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.maxDate = new Date(currentYear - 18, currentMonth, currentDate);
    this.minDate = new Date(currentYear - 120, currentMonth, currentDate);
  }
}
