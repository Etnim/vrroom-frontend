import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { MakesDataService } from '../../../services/vehicle-info.service';
import { HttpClientModule } from '@angular/common/http';
import { map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import type { VehicleInfoFormGroup, EmissionRangeFormGroup } from '../types';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-vehicle-info',
  standalone: true,
  imports: [
    VehicleInfoComponent,
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
    HttpClientModule,
    AsyncPipe
  ],
  templateUrl: './vehicle-info.component.html',
  styleUrl: './vehicle-info.component.scss'
})
export class VehicleInfoComponent {
  thirdFormGroup = this._formBuilder.group<VehicleInfoFormGroup>({
    make: new FormControl<string | null>(null, Validators.required),
    model: new FormControl<string | null>('', Validators.required),
    year: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(2010),
      Validators.max(2024)
    ]),
    fuelType: new FormControl<string | null>(null, Validators.required)
  });

  emissionRangeForm = this._formBuilder.group<EmissionRangeFormGroup>({
    start: new FormControl<number>(0),
    end: new FormControl<number>(20)
  });

  makes: string[] = [];
  models: Observable<string[]> = of([]);

  filteredMakes: Observable<string[]>;

  makeControl = new FormControl('', Validators.required);
  modelControl = new FormControl('');
  currentYear = new Date().getFullYear();

  constructor(private _formBuilder: FormBuilder, private makesDataService: MakesDataService) {
    this.makesDataService.getMakes().subscribe({
      next: (response) => {
        this.makes = response;
      },
      error: (error) => {
        console.error('Failed to fetch makes:', error);
      }
    });

    this.filteredMakes = this.makeControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : '')),
      map((name) => this._filter(name))
    );
  }

  onMakeSelectionChange(make: string) {
    console.log('Selected make:', make);
    this.thirdFormGroup.get('make')?.setValue(make);
    this.models = this.makesDataService.getModels(make).pipe(map((response) => response));
  }

  displayFn(make: string): string {
    return make;
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.makes.filter((option) => option.toLowerCase().includes(filterValue));
  }

}
