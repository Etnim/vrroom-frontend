import {Component, Injectable, Input, OnChanges} from '@angular/core';
import {Calculator, LeasingInfo} from "../wizard/types";

@Component({
  selector: 'app-calculator',
  standalone: true,
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})

@Injectable({
  providedIn: 'root',
})

export class CalculatorComponent implements OnChanges {
  calculator: Calculator = {monthly: 0, fee: 0};
  @Input() inputValues!: LeasingInfo;

  ngOnChanges(): void {
    if (this.inputValues) {
      this.calculator.monthly = this.getMonthly();
      this.calculator.fee = this.getFee();
    }
  }

  getMonthly() {
    let r = this.inputValues.interestRate / 100;
    let n = this.inputValues.period * 12;
    let result: number;
    let amount = this.inputValues.amount;
    let calculatedDownPayment = (this.inputValues.amount * this.inputValues.downPayment) / 100
    let calculatedResidualPayment = (this.inputValues.amount * this.inputValues.residualValue) / 100;
    let p = amount - calculatedDownPayment - calculatedResidualPayment;
    const up = (p * Math.pow((1 + r), n) * r);
    const down = Math.pow((1 + r), n) - 1;
    result = up / down;
    return Math.round(result);
  }

  getFee() {
    let fee = this.inputValues.amount * 0.01;
    if (fee < 200) {
      return 200;
    } else return fee;
  }
}
