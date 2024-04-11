import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss'
})
export class WizardComponent {
  wizardTitle = 'vRroom';

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  })
  forthFormGroup = this._formBuilder.group({
    forthCtrl: ['', Validators.required],
  })
  fifthFormGroup = this._formBuilder.group({
    fiftCtrl: ['', Validators.required],
  })
  isEditable = false;

  constructor(private _formBuilder: FormBuilder) {
  }
}
