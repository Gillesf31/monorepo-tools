import { Injectable } from '@angular/core';
import {CurrencyModel} from "@monorepo-tools/shared/exchange-rate/util";
import {FEDERAL_TAX_INCOME_BY_PERCENTAGE} from "@monorepo-tools/tax-simulation/page-simulation/util";

@Injectable()
export class CalculateTaxService {
  calculateTaxFromIncome = (income: number, currency: CurrencyModel, exchangeRate: number): number => {
      if (currency === 'CAD') {
        return income - (income * this.calculateCanadianFederalTaxPercentageRate(income));
      } else if (currency === 'EUR') {
        const incomeCAD = income * exchangeRate;
        return incomeCAD - (incomeCAD * this.calculateCanadianFederalTaxPercentageRate(incomeCAD));
      } else {
        return 0;
      }
  }

  calculateCanadianFederalTaxPercentageRate = (income: number): number => {
    if (income <= 49020) {
      return FEDERAL_TAX_INCOME_BY_PERCENTAGE[49020];
    } else if (income <= 98040) {
      return FEDERAL_TAX_INCOME_BY_PERCENTAGE[98040];
    } else if (income <= 151978) {
      return FEDERAL_TAX_INCOME_BY_PERCENTAGE[151978];
    } else if (income <= 216511) {
      return FEDERAL_TAX_INCOME_BY_PERCENTAGE[216511];
    } else {
      return FEDERAL_TAX_INCOME_BY_PERCENTAGE[100000000];
    }
  }
}
