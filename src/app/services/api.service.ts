import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'
import { ForecastI, CityI } from "../models/wheather.models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getForecast(city: CityI) {
    const url = `${environment.baseUrl}lat=${city.latitude}&lon=${city.longitude}&exclude=minutely&appid=${environment.apiKey}`;
    return this._http.get<ForecastI>(url);
  }
}
