import { Injectable } from '@angular/core';
import {CurrencyModel} from "@monorepo-tools/shared/exchange-rate/util";

@Injectable()
export class CalculateTaxService {
  calculateTaxFromIncome = (income: number, currency: CurrencyModel, exchangeRate: number): number => {
      if (currency === 'CAD') {
        return income - (income * this.calculateCanadianFederalTaxPercentageRate(income));
      } else if (currency === 'EUR') {
        const incomeCAD = income * exchangeRate;
        console.warn('incomeCAD', incomeCAD);
        console.warn('result : ', incomeCAD - (incomeCAD * this.calculateCanadianFederalTaxPercentageRate(incomeCAD)));
        return incomeCAD - (incomeCAD * this.calculateCanadianFederalTaxPercentageRate(incomeCAD));
      } else {
        return 0;
      }
  }

  calculateCanadianFederalTaxPercentageRate = (income: number): number => {
    if (income <= 49020) {
      return 0.15;
    } else if (income <= 98040) {
      return 0.205;
    } else if (income <= 151978) {
      return 0.26;
    } else if (income <= 216511) {
      return 0.29;
    } else {
      return 0.33;
    }
  }
}
