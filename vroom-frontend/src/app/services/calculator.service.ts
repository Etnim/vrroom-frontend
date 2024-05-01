import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private monthly: number = 0;
  private fee: number = 0;

  setMonthly(value: number) {
    this.monthly = value;
  }

  setFee(value: number) {
    this.fee = value;
  }

  getMonthly() {
    return this.monthly;
  }

  getFee() {
    return this.fee;
  }
}
