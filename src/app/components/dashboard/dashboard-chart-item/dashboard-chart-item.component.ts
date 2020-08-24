import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ForecastI } from "../../../models/wheather.models";
import { getChartData, getDateByTimestamp, toCapitalizeCase } from "../../../helpers/dashboard.helper";
import { chartTypes } from "../../../other/variables";

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
  showColorPicker = false;
  currentColor: string = '';

  currentType: string;
  types: string[] = chartTypes;
  highCharts = Highcharts;
  chartOptions: {};

  setChartOptions() {
    if (!this.forecast) return;
    return {
      chart: {
        type: this.currentType,
        width: 600,
        height: 350,
        borderRadius: 5,
        borderColor: '#606060',
        borderWidth: 2
      },
      title: {
        text: this.cityName
      },
      xAxis: {
        labels: {
          formatter: function() {
            return getDateByTimestamp(this.value)
          }
        },
      },
      tooltip: {
        backgroundColor: '#fff',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 3,
        formatter: function () {
          return `Date: ${getDateByTimestamp(this.x)}<br/>
             ${this.series.name}: ${this.y}`
        }
      },
      series: getChartData(this.forecast, this.showTemperature, this.showPressure, this.showHumidity, this.currentColor)
    }
  }

  setChartType(index: number): void {
    this.currentType = this.types[index];
    this.chartOptions = this.setChartOptions();
  }

  getTypeName(type: string): string {
    return toCapitalizeCase(type);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.forecast) this.setChartType(0);
  }

  toggleColorPicker(): void {
    this.showColorPicker = !this.showColorPicker;
  }

  changeColor(color: string): void {
    this.toggleColorPicker();
    this.currentColor = color;
    this.chartOptions = this.setChartOptions();
  }

}
