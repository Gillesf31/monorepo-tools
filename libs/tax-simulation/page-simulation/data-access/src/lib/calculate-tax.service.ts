import { Injectable } from '@angular/core';
import {CurrencyModel} from "@monorepo-tools/shared/exchange-rate/util";
import {
  FEDERAL_TAX_INCOME_BY_PERCENTAGE, FEDERAL_TAX_INCOME_FIFTH_TAX_BRACKET,
  FEDERAL_TAX_INCOME_FIRST_TAX_BRACKET,
  FEDERAL_TAX_INCOME_FOURTH_TAX_BRACKET,
  FEDERAL_TAX_INCOME_SECOND_TAX_BRACKET,
  FEDERAL_TAX_INCOME_THIRD_TAX_BRACKET, FederalBracketPercentageType
} from "@monorepo-tools/tax-simulation/page-simulation/util";

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

  calculateCanadianFederalTaxPercentageRate = (income: number): FederalBracketPercentageType => {
    if (income <= FEDERAL_TAX_INCOME_FIRST_TAX_BRACKET) {
      return FEDERAL_TAX_INCOME_BY_PERCENTAGE[FEDERAL_TAX_INCOME_FIRST_TAX_BRACKET];
    } else if (income <= FEDERAL_TAX_INCOME_SECOND_TAX_BRACKET) {
      return FEDERAL_TAX_INCOME_BY_PERCENTAGE[FEDERAL_TAX_INCOME_SECOND_TAX_BRACKET];
    } else if (income <= FEDERAL_TAX_INCOME_THIRD_TAX_BRACKET) {
      return FEDERAL_TAX_INCOME_BY_PERCENTAGE[FEDERAL_TAX_INCOME_THIRD_TAX_BRACKET];
    } else if (income <= FEDERAL_TAX_INCOME_FOURTH_TAX_BRACKET) {
      return FEDERAL_TAX_INCOME_BY_PERCENTAGE[FEDERAL_TAX_INCOME_FOURTH_TAX_BRACKET];
    } else {
      return FEDERAL_TAX_INCOME_BY_PERCENTAGE[FEDERAL_TAX_INCOME_FIFTH_TAX_BRACKET];
    }
  }
}
