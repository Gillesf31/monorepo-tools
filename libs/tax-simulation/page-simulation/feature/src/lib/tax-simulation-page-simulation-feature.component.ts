import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {CurrencyModel} from "@monorepo-tools/shared/exchange-rate/util";
import {ExchangeRateModel, GetExchangeRateService} from "@monorepo-tools/shared/exchange-rate/data-access";
import {take} from "rxjs";

@Component({
  selector: 'tax-simulation-tax-simulation-page-simulation-feature',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [GetExchangeRateService],
  templateUrl: './tax-simulation-page-simulation-feature.component.html',
})
export class TaxSimulationPageSimulationFeatureComponent implements OnInit {
  result = 0;
  currentExchangeRateEURToCAD = 0;
  currentExchangeRateCADToEUR = 0;
  currentCurrency: CurrencyModel | undefined;
  constructor(private readonly getExchangeRateService: GetExchangeRateService) {}

  ngOnInit(): void {
    this.getExchangeRateService.getExchangeRates('EUR', 'CAD').pipe(take(1)).subscribe((data: ExchangeRateModel) => {
      this.currentExchangeRateEURToCAD = data.conversion_rate;
    });
    this.getExchangeRateService.getExchangeRates('CAD', 'EUR').pipe(take(1)).subscribe((data: ExchangeRateModel) => {
      this.currentExchangeRateCADToEUR = 0.69;
    });
  }

  calculate = (eventIncome: Event, currency: CurrencyModel): void => {
    this.currentCurrency = currency
    if (eventIncome.target) {
      if (currency === 'CAD') {
        const income = Number((eventIncome.target as HTMLInputElement).value);
        this.result = income - income * this.calculateCanadianFederalTaxPercentageRate(income);
      } else if (currency === 'EUR') {
          const income = Number((eventIncome.target as HTMLInputElement).value) * this.currentExchangeRateEURToCAD;
          console.warn('income', income);
          this.result = income - income * this.calculateCanadianFederalTaxPercentageRate(income);
      }
    } else {
      this.result = 0;
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
