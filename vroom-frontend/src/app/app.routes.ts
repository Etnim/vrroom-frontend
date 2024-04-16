import { Routes } from '@angular/router';
import { WizardComponent } from './components/wizard/wizard.component';
import {CalculatorComponent} from "./components/calculator/calculator.component";
export const routes: Routes = [
  { path: '', component: WizardComponent },
  { path: 'calculator', component: CalculatorComponent}
];
