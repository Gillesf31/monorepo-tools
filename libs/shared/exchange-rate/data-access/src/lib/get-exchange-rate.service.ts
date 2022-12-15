import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CurrencyModel} from "@monorepo-tools/shared/exchange-rate/util";
import {ExchangeRateModel} from "./models/exhange-rates.model";

@Injectable()
export class GetExchangeRateService {

  constructor(private readonly httpClient: HttpClient) { }

  getExchangeRates(firstCurrency: CurrencyModel, secondCurrency: CurrencyModel): Observable<ExchangeRateModel> {
    //return this.httpClient.get<ExchangeRateModel>(`https://v6.exchangerate-api.com/v6/apiKey/pair/${firstCurrency}/${secondCurrency}`);
    return of({
      result: "success",
      documentation: "https://www.toto.com/docs",
      terms_of_use: "https://www.toto.com/terms",
      time_last_update_unix: 1622028800,
      time_last_update_utc: "Sun, 16 May 2021 00:00:00 +0000",
      time_next_update_unix: 1622115200,
      time_next_update_utc: "Mon, 17 May 2021 00:00:00 +0000",
      base_code: firstCurrency,
      target_code: secondCurrency,
      conversion_rate: 1.45
    })
  }
}
