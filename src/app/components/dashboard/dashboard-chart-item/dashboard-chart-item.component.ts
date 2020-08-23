import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ForecastI } from "../../../models/wheather.models";
import { getChartData, toCapitalizeCase } from "../../../helpers/dashboard.helper";
import { tooltipOptions } from "../../../other/cities";

@Component({
  selector: 'app-dashboard-chart-item',
  templateUrl: './dashboard-chart-item.component.html',
  styleUrls: ['./dashboard-chart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardChartItemComponent implements OnChanges {

  @Input() forecast: ForecastI;
  @Input() showTemperature = false;
  @Input() showPressure = false;
  @Input() showHumidity = false;
  @Input() cityName = '';

  type: string;
  types: string[] = ['line', 'column', 'bar'];

  highCharts = Highcharts;
  chartOptions: {};

  setChartOptions() {
    if (!this.forecast) return;
    return {
      chart: {
        type: this.type,
        width: 600,
        height: 350,
        borderRadius: 5
      },
      title: {
        text: this.cityName
      },
      tooltip: tooltipOptions,
      series: getChartData(this.forecast, this.showTemperature, this.showPressure, this.showHumidity)
    }
  }

  setChartType(index: number): void {
    this.type = this.types[index];
    this.chartOptions = this.setChartOptions();
  }


  getTypeName(type: string): string {
    return toCapitalizeCase(type);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.forecast) this.setChartType(0);
  }


}
