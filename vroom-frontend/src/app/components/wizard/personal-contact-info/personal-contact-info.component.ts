import {Component} from '@angular/core';
import type {PersonalAndContactInfoFormGroup} from '../types';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  provideNativeDateAdapter
} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {
  extractBirthDate,
  PHONE_REGX,
  PERSONAL_CODE_REGX,
  LITHUANIAN_LETTERS_REGEX, ADRESSS_REGEX
} from './personal-contact-info.utils';

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
  providers: [
    provideNativeDateAdapter(),
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
  templateUrl: './personal-contact-info.component.html',
  styleUrls: ['./personal-contact-info.component.scss']
})
export class PersonalContactInfoComponent {
  fourthFormGroup = this._formBuilder.group<PersonalAndContactInfoFormGroup>({
    name: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(LITHUANIAN_LETTERS_REGEX)
    ]),
    surname: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(LITHUANIAN_LETTERS_REGEX)
    ]),
    dateOfBirth: new FormControl<string | null>(null, [Validators.required]),
    identificationNumber: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(PERSONAL_CODE_REGX)
    ]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(PHONE_REGX)
    ]),
    address: new FormControl<string | null>(null,
      [Validators.required,
        Validators.pattern(ADRESSS_REGEX)])
  });

  minDate: Date;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.maxDate = new Date(currentYear - 18, currentMonth, currentDate);
    this.minDate = new Date(currentYear - 120, currentMonth, currentDate);
    this.dateAdapter.getFirstDayOfWeek = () => 1;

    this.fourthFormGroup
      .get('identificationNumber')
      ?.valueChanges.subscribe((value: string | null) => {
      if (value && PERSONAL_CODE_REGX.test(value)) {
        const birthDate = extractBirthDate(value);
        this.fourthFormGroup.get('dateOfBirth')?.setValue(birthDate);
      } else {
        this.fourthFormGroup.get('dateOfBirth')?.reset();
      }
    });
  }
}
