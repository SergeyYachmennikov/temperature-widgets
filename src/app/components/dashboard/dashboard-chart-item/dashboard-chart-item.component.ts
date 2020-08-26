import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ForecastI } from "../../../models/wheather.models";
import {
  createNewSeriesItem,
  getChartData,
  getDateByTimestamp,
  getTypeFromArray,
} from "../../../helpers/dashboard.helper";
import { chartTypes, defaultColors } from "../../../other/variables";

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
  showSensorSelector = false;
  currentColor: string = defaultColors[10];
  types: string[] = chartTypes;
  currentType: string = chartTypes[0];
  highCharts = Highcharts;
  chartOptions: any;
  chartCallback;
  chart;

  constructor() {
    this.chartCallback = chart => this.chart = chart;
  }

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

  setChartType(type: string): void {
    this.currentType = getTypeFromArray(type, this.types)
    this.chartOptions = { ...this.setChartOptions() };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.forecast) this.setChartType(this.currentType);
  }

  toggleButtonHandler(button?: string): void {
    if (!button) {
      this.showColorPicker = false;
      this.showSensorSelector = false;
    }
    this[button] = !this[button];
  }

  changeColor(color: string): void {
    this.toggleButtonHandler('showColorPicker');
    this.currentColor = color;
    this.chartOptions = { ...this.setChartOptions() };
  }

  addSensorToChart(sensor: string): void {
    this.chart.showLoading();
    this.toggleButtonHandler();
    if (this[sensor] === true) return;
    this[sensor] = !this[sensor];
    this.chartOptions = { ...this.setChartOptions() };
    this.chart.addSeries(createNewSeriesItem(this.currentColor, sensor, this.forecast))
  }

}
