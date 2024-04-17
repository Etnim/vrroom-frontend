import {Component, Injectable, Input, OnChanges} from '@angular/core';
import {Calculator, LeasingInfo} from "../types";

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
    let interestRate = this.inputValues.interestRate / 100;
    let months = this.inputValues.period * 12;
    let amount = this.inputValues.amount;
    let calculatedDownPayment = (this.inputValues.amount * this.inputValues.downPayment) / 100
    let calculatedResidualPayment = (this.inputValues.amount * this.inputValues.residualValue) / 100;
    let totalAmount = amount - calculatedDownPayment - calculatedResidualPayment;
    const divisionUnit = (totalAmount * Math.pow((1 + interestRate), months) * interestRate);
    const divider = Math.pow((1 + interestRate), months) - 1;
    let monthlyPayment = divisionUnit / divider;
    return Math.round(monthlyPayment);
  }

  getFee() {
    let fee = this.inputValues.amount * 0.01;
    if (fee < 200) {
      return 200;
    } else return fee;
  }
}
