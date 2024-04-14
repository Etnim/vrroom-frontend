import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { VehicleInfoFormGroup } from '../types';


export interface Make {
  id: number;
  name: string;
  models?: Model[]; // Optional property for pre-populated models
}

export interface Model {
  id: number;
  name: string;
  makeId: number; // Foreign key to reference the Make
}

// Mocked data for pre-population.
const makes: Make[] = [
  {
    id: 1,
    name: 'BMW',
    models: [
      { id: 11, name: '3 Series', makeId: 1 },
      { id: 12, name: '5 Series', makeId: 1 },
      { id: 13, name: 'X3', makeId: 1 },
    ]
  },
  {
    id: 2,
    name: 'Toyota',
    models: [
      { id: 21, name: 'Corolla', makeId: 2 },
      { id: 22, name: 'Camry', makeId: 2 },
      { id: 23, name: 'RAV4', makeId: 2 },
    ]
  },
  {
    id: 3,
    name: 'Citroen',
    models: [
      { id: 31, name: 'C3', makeId: 3 },
      { id: 32, name: 'C4', makeId: 3 },
    ]
  },
  {
    id: 4,
    name: 'Volkswagen',
    models: [
      { id: 41, name: 'Golf', makeId: 4 },
      { id: 42, name: 'Tiguan', makeId: 4 },
    ]
  },
];

@Component({
  selector: 'app-vehicle-info',
  standalone: true,
  imports: [VehicleInfoComponent,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe],
  templateUrl: './vehicle-info.component.html',
  styleUrl: './vehicle-info.component.scss'
})
export class VehicleInfoComponent {
  @Input() formGroup!: FormGroup<VehicleInfoFormGroup>;

  makes: Make[] = makes;
  filteredModels: Model[] = [];

  makeSearch = new FormControl('');
  modelSearch = new FormControl('');

  trackByMakeId(index: number, item: Make): number {
    return item.id; 
  }

  trackByModelId(index: number, item: Model): number {
    return item.id; 
  }

  onMakeSelectionChange(makeId: number) {
    this.filteredModels = []; // Reset the filtered models
    if (makeId) {
      this.filteredModels = this.makes.find(make => make.id === makeId)?.models || [];
    }
  }

  // onMakeSearch(value: string | null) {
  //   if (!value) {
  //     return;
  //   }
  //   else{
  //     this.makes = makes.filter(make => make.name.toLowerCase().includes(value.toLowerCase()));}
    
  // }
  // onModelSearch(value: string | null) {
  //   if (!value) {
  //     return;
  //   }
  //   else{
  //     this.filteredModels = this.makes
  //       .flatMap(make => make.models || [])
  //       .filter(model => model.name.toLowerCase().includes(value.toLowerCase()));
  //   }
  // }

}
