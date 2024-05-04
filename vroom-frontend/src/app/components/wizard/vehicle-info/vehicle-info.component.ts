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
import { map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
    brand: new FormControl<string | null>(null, Validators.required),
    model: new FormControl<string | null>('', Validators.required),
    year: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(2010),
      Validators.max(2024)
    ]),
    fuel: new FormControl<string | null>(null, Validators.required),
    emission: new FormControl<number | null>(120, Validators.required)
  });

  makes: string[] = [];
  models: string[] = [];

  filteredMakes: Observable<string[]> = of([]);
  filteredModels: Observable<string[]>;

  makeControl = new FormControl('', Validators.required);
  modelControl = new FormControl('');
  currentYear = new Date().getFullYear();

  constructor(private _formBuilder: FormBuilder, private makesDataService: MakesDataService) {
    this.makesDataService.getMakes().subscribe((makes) => {
      this.makes = makes;
      this.filteredMakes = this.makeControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    });
    this.filteredModels = of([]);

    // Reactively filter models based on user input
    this.modelControl.valueChanges
      .pipe(
        startWith(''),
        tap((value) => this.thirdFormGroup.get('model')?.setValue(value)),
        switchMap((input) =>
          of(
            this.models.filter((model) => model.toLowerCase().includes((input || '').toLowerCase()))
          )
        )
      )
      .subscribe((filtered) => {
        this.filteredModels = of(filtered);
      });
  }

  updateAndFilterModels(value: string): Observable<string[]> {
    const selectedMake = this.thirdFormGroup.get('brand')!.value;
    if (selectedMake) {
      return this.makesDataService.getModels(selectedMake).pipe(
        map((models) => {
          this.models = models;
          return models.filter((model) => model.toLowerCase().includes(value.toLowerCase()));
        })
      );
    }
    return of([]);
  }

  onMakeSelectionChange(make: string) {
    console.log('Selected make:', make);
    this.thirdFormGroup.get('brand')!.setValue(make);
    this.modelControl.reset();
    this.makesDataService.getModels(make).subscribe((models) => {
      this.models = models;
      this.filteredModels = of(models);
    });
  }

  displayFn(item: any): string {
    return item ? item : '';
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.makes.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
