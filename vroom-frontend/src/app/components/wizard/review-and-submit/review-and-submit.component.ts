import { Component, Input, OnInit } from '@angular/core';
import type { ReviewAndSubmitFormGroup, LeasingInfoFormGroup } from '../types';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import type { CompleteFormData } from '../types';

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
    JsonPipe,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './review-and-submit.component.html',
  styleUrl: './review-and-submit.component.scss'
})
export class ReviewAndSubmitComponent {
  @Input() formGroup!: FormGroup<ReviewAndSubmitFormGroup>;
  // @Input() data!: CompleteFormData;
  @Input() wizardForm!: FormGroup<CompleteFormData>;

  isFormFilled: boolean = false;

  ngOnInit() {
    this.checkFormFilled();
  }
  get formData() {
    return this.formGroup.value;
  }

  submitReviewedForm() {
    console.log('Submitted:', this.formGroup.value);
  }

  checkFormFilled() {
    console.log('yooo', this.wizardForm.value);
    // console.log('carefull');
    // this.isFormFilled = Object.values(this.wizardForm.controls).every((control) => {
    //   if (control instanceof FormGroup) {
    //     return Object.values(control.controls).every((nestedControl) => {
    //       console.log('checking lol', nestedControl.value);
    //       return nestedControl.value !== null;
    //     });
    //   }
    //   return control.value !== null;
    // });
  }
}
