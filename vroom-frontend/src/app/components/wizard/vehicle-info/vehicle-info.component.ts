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
import { MakesDataService } from '../../../services/vehicle-info.service';
import { Make, Model } from '../../../models/makes.model';
import { HttpClientModule } from '@angular/common/http';
import { map, startWith,  tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


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
      map(response => response.Results),  
    )
  }

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
}
