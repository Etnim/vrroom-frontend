import { Component, Input, OnInit } from '@angular/core';
import type { PersonalAndContactInfoFormGroup } from '../types';
import { FormBuilder, FormControl, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
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
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './personal-contact-info.component.html',
  styleUrls: ['./personal-contact-info.component.scss']
})

export class PersonalContactInfoComponent {
  @Input() formGroup!: FormGroup<PersonalAndContactInfoFormGroup>;
  

  minDate: Date;
  maxDate: Date;

  constructor(private fb: FormBuilder) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.maxDate = new Date(currentYear - 18, currentMonth, currentDate);
    this.minDate = new Date(currentYear - 120, currentMonth, currentDate);

  }
}
