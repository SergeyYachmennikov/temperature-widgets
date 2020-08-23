import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ApiService } from "../../services/api.service";
import { cities } from '../../other/cities';
import { CityI, ForecastI } from '../../models/wheather.models';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { findCityIndexByName, getArrayIndexes, getForecastByDays } from "../../helpers/dashboard.helper";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  availablePeriods: number[];
  // chartsCount = [1, 2, 3, 4];
  currentCity: string;
  cities: CityI[] = cities;
  forecast: ForecastI;

  @ViewChild(MatMenuTrigger) days: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) citiesList: MatMenuTrigger;
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.setCity(0);
  }

  setDaysCount(daysCount: number): string {
    return daysCount !== 1 ? daysCount + ' days' : daysCount + ' day';
  }

  setCity(index: number, daysCount: number = 0) {
    this.currentCity = this.cities[index].cityName;
    this.apiService.getForecast(this.cities[index])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe( forecast => {
        this.forecast = getForecastByDays(forecast, daysCount);
        this.availablePeriods = getArrayIndexes(forecast)
      });
  }

  setPeriod(daysCount: number): void {
    this.setCity(findCityIndexByName(this.cities, this.currentCity), daysCount)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }


}