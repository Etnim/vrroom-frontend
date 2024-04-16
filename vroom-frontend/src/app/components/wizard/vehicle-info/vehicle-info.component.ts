import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { VehicleInfoFormGroup } from '../types';
import { MakesDataService } from '../../../services/vehicle-info.service';
import { Make, Model } from '../../../models/makes.model';
import { HttpClientModule } from '@angular/common/http';
import { catchError, debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


// export interface Make {
//   id: number;
//   name: string;
//   models?: Model[]; // Optional property for pre-populated models
// }

// export interface Model {
//   id: number;
//   name: string;
//   makeId: number; // Foreign key to reference the Make
// }

// Mocked data for pre-population.
// const makes: Make[] = [
//   {
//     id: 1,
//     name: 'BMW',
//     models: [
//       { id: 11, name: '3 Series', makeId: 1 },
//       { id: 12, name: '5 Series', makeId: 1 },
//       { id: 13, name: 'X3', makeId: 1 },
//     ]
//   },
//   {
//     id: 2,
//     name: 'Toyota',
//     models: [
//       { id: 21, name: 'Corolla', makeId: 2 },
//       { id: 22, name: 'Camry', makeId: 2 },
//       { id: 23, name: 'RAV4', makeId: 2 },
//     ]
//   },
//   {
//     id: 3,
//     name: 'Citroen',
//     models: [
//       { id: 31, name: 'C3', makeId: 3 },
//       { id: 32, name: 'C4', makeId: 3 },
//     ]
//   },
//   {
//     id: 4,
//     name: 'Volkswagen',
//     models: [
//       { id: 41, name: 'Golf', makeId: 4 },
//       { id: 42, name: 'Tiguan', makeId: 4 },
//     ]
//   },
// ];

// I want to fetch makes from the api /cars/makes


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
    AsyncPipe],
  templateUrl: './vehicle-info.component.html',
  styleUrl: './vehicle-info.component.scss'
})
export class VehicleInfoComponent {
  @Input() formGroup!: FormGroup;

  makes: Make[] = [];
  models: Observable<Model[]> = of([]);

  filteredMakes: Observable<Make[]>;

  makeControl = new FormControl('', Validators.required);
  modelControl = new FormControl('');
  currentYear = new Date().getFullYear();
  
  constructor(private makesDataService: MakesDataService) {
    this.makesDataService.getMakes().subscribe({
      next: (response) => {
        this.makes = response.Results;
      },
      error: (error) => {console.error('Failed to fetch makes:', error)
      }
    });
    
    this.filteredMakes = this.makeControl.valueChanges.pipe(
      startWith(''),  
      map(value => typeof value === 'string' ? value : ''),
      map(name => this._filter(name))
    );
    

  }

  onMakeSelectionChange(make : string) {
    console.log("Selected make:", make);
    this.models = this.makesDataService.getModels(make).pipe(
      tap(response => console.log("Models:", response)),
      map(response => response.Results),  
    )
  }

  // initializeModelsObservable() {
  //   this.models = this.makeControl.valueChanges.pipe(
  //     startWith(''),
  //     map(makeName => this.makes.find(make => make.MakeName === makeName)),
  //     switchMap(make => {
  //       return make ? this.makesDataService.getModels(make.MakeName).pipe(
  //         map(response => response.Results),  // Extracting Model[] from the response
  //         catchError(error => {
  //           console.error('Failed to fetch models:', error);
  //           return of([]);  // Return an empty array on error
  //         })
  //       ) : of([]);
  //     })
  //   );
  // }


  displayFn(make: Make): string {
    return make && make.MakeName ? make.MakeName : '';
  }

  private _filter(name: string): Make[] {
    const filterValue = name.toLowerCase();
    return this.makes.filter(option => option.MakeName.toLowerCase().includes(filterValue));
  }

  trackByMakeId(index: number, make: Make) {
    return make.MakeId;
  }

  trackByModelId(index: number, model: Model) {
    return model.Model_ID;
  }

  
  // private filterMakes(searchTerm: string) {
  //   if (!searchTerm) {
  //     this.filteredMakes = this.makes;
  //   } else {
  //     this.filteredMakes = this.makes.filter(make =>
  //       make.MakeName.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }
  // }
  

  // originalMakes: Make[] = makes;  // Keep the original list intact
  // displayedMakes: Make[] = makes; // This is what you'll bind in your template
  // selectedMake: Make | null = null; // Track the selected make
  // filteredModels: Model[] = [];

  // @Input() set makes(makes: Make[]) {
  //   if (makes) {
  //     this.originalMakes = makes;
  //     this.displayedMakes = makes;
  //   }
  // }

  // currentYear = new Date().getFullYear();
  // makeFilter = new FormControl('');
  // modelSearch = new FormControl('');

  // constructor() {}

  // trackByMakeId(index: number, make: Make) {
  //   return make.id;
  // }

  // trackByModelId(index: number, model: Model) {
  //   return model.id;
  // }
  // onMakeSelectionChange(makeId: number) {
  //   this.selectedMake = this.originalMakes.find(make => make.id === makeId) || null;
  //   if (this.selectedMake) {
  //     this.filteredModels = this.selectedMake.models || [];
  //   }
  // }

  // onMakeSearch(value: string | null) {
  //   if (!value) {
  //     this.displayedMakes = this.originalMakes;
  //   } else {
  //     this.displayedMakes = this.originalMakes.filter(make => make.name.toLowerCase().includes(value.toLowerCase()));
  //   }

  // }

  // onModelSearch(value: string | null) {
  //   if (!value) {
  //     this.filteredModels = this.selectedMake?.models || [];
  //   } else {
  //     this.filteredModels = this.selectedMake?.models?.filter(model => model.name.toLowerCase().includes(value.toLowerCase())) || [];
  //   }
  // }
}
