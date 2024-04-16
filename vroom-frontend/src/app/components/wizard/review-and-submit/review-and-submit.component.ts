import { Component, Input, OnInit } from '@angular/core';
import type { ReviewAndSubmitFormGroup, CompleteFormData } from '../types';
import { FormBuilder, FormControl, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-review-and-submit',
  standalone: true,
  imports: [
    ReviewAndSubmitComponent,
    MatCheckboxModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './review-and-submit.component.html',
  styleUrl: './review-and-submit.component.scss'
})
export class ReviewAndSubmitComponent {
  @Input() formGroup!: FormGroup<ReviewAndSubmitFormGroup>;
  @Input() data!: CompleteFormData;

  submitReviewedForm() {
    console.log('Submitted:', this.formGroup.value);
  }
}

