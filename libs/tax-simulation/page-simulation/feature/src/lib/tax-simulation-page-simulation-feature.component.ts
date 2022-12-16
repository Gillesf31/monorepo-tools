import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CurrencyModel} from "@monorepo-tools/shared/exchange-rate/util";
import {ExchangeRateModel, GetExchangeRateService} from "@monorepo-tools/shared/exchange-rate/data-access";
import {take} from "rxjs";
import {ShortNumbersPipe} from "@monorepo-tools/shared/helpers/util";
import {CalculateTaxService} from "@monorepo-tools/tax-simulation/page-simulation/data-access";

@Component({
  selector: 'tax-simulation-tax-simulation-page-simulation-feature',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ShortNumbersPipe],
  providers: [GetExchangeRateService, CalculateTaxService, ShortNumbersPipe],
  templateUrl: './tax-simulation-page-simulation-feature.component.html',
})
export class TaxSimulationPageSimulationFeatureComponent implements OnInit {
  result = 0;
  currentExchangeRateEURToCAD = 0;
  currentExchangeRateCADToEUR = 0;
  incomeCAD = 0;
  currentCurrency: CurrencyModel = 'EUR';

  taxSimulationForm!: FormGroup<{
    currency: FormControl<boolean>,
    tjm: FormControl<number>,
    daysOfWork: FormControl<number>,
    selfEmployedIncome: FormControl<number>,
  }>;

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly getExchangeRateService: GetExchangeRateService,
    private readonly calculateTaxService: CalculateTaxService
  ) {
    this.taxSimulationForm = this.fb.group({
      currency: [false, [Validators.required]],
      tjm: [0, [Validators.required]],
      daysOfWork: [0, [Validators.required]],
      selfEmployedIncome: [0],
    })
  }

  ngOnInit(): void {
    this.getExchangeRateService.getExchangeRates('EUR', 'CAD').pipe(take(1)).subscribe((data: ExchangeRateModel) => {
      this.currentExchangeRateEURToCAD = data.conversion_rate;
    });
    this.getExchangeRateService.getExchangeRates('CAD', 'EUR').pipe(take(1)).subscribe((data: ExchangeRateModel) => {
      this.currentExchangeRateCADToEUR = 0.69;
    });
  }

  getPercentageRate(income: number): number {
    return this.calculateTaxService.calculateCanadianFederalTaxPercentageRate(income)
  }

  onSubmit() {
    this.currentCurrency = !this.taxSimulationForm.value.currency ? 'EUR' : 'CAD';
    if (this.taxSimulationForm.value.tjm && this.taxSimulationForm.value.daysOfWork) {
      if (this.currentCurrency === 'EUR') {
        this.incomeCAD = this.taxSimulationForm.value.tjm * this.taxSimulationForm.value.daysOfWork * this.currentExchangeRateEURToCAD;
      } else {
        this.incomeCAD = this.taxSimulationForm.value.tjm * this.taxSimulationForm.value.daysOfWork;
      }
      this.result = this.calculateTaxService.calculateTaxFromIncome(this.taxSimulationForm.value.tjm * this.taxSimulationForm.value.daysOfWork, this.currentCurrency, this.currentExchangeRateEURToCAD);
    }
  }

  setCurrency(): void {
    this.currentCurrency = this.currentCurrency === 'EUR' ? 'CAD' : 'EUR';
  }
}
