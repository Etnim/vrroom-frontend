import { Component } from '@angular/core';
import type { PersonalAndContactInfoFormGroup } from '../types';
import {
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-personal-contact-info',
  standalone: true,
  imports: [
    PersonalContactInfoComponent,
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
  providers: [provideNativeDateAdapter()],
  templateUrl: './personal-contact-info.component.html',
  styleUrls: ['./personal-contact-info.component.scss']
})
export class PersonalContactInfoComponent {
  fourthFormGroup = this._formBuilder.group<PersonalAndContactInfoFormGroup>({
    name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
    surname: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
    dateOfBirth: new FormControl<string | null>(null, [Validators.required]), // @TODO: Date format?
    identificationNumber: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern('[1-6]{1}[0-9]{10}')
    ]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern('[+0-9]{9,13}$')
    ]),
    address: new FormControl<string | null>(null, Validators.required),
    city: new FormControl<string | null>(null, Validators.required),
    postalCode: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern('^(LT)?[0-9]{5}$')
    ])
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
