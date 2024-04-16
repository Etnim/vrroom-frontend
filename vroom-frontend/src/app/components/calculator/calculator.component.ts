import {Component, Input, OnInit} from '@angular/core';
import {Calculator, LeasingInfo} from "../wizard/types";

@Component({
  selector: 'app-calculator',
  standalone: true,
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})

export class CalculatorComponent implements OnInit {
  calculator: Calculator = {monthly: 0, fee: 0};
  @Input() inputValues!: LeasingInfo;

  ngOnInit() {
    this.calculator.monthly = this.getMonthly();
    this.calculator.fee = this.getFee();
  }

  getMonthly(): number {
    let p: number;
    let r: number;
    let n: number;

    p = this.inputValues.amount - this.inputValues.calculatedDownPayment - this.inputValues.calculatedResidualValue;
    n = this.inputValues.period;
    r = this.inputValues.interestRate / 100;

    const up = (p * Math.pow((1 + r), n) * r);
    const down = Math.pow((1 + r), n) - 1;
    const result = up / down;
    return Math.round(result);
  }

  getFee(): number {
    let fee = this.calculator.monthly * 0.01;
    if (fee < 200) {
      return 200;
    } else return fee;
  }
}
