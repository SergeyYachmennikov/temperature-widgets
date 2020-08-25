import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ForecastI, SeriesItemI } from "../../../models/wheather.models";
import { getChartData, getDateByTimestamp, getTypeFromArray, toCapitalizeCase } from "../../../helpers/dashboard.helper";
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
        borderWidth: 2,
        events: {
          addSeries: function () {
            console.log(this, 666)
          }
        }
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

  getTypeName(type: string): string {
    return toCapitalizeCase(type);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.forecast) this.setChartType(this.currentType);
  }

  toggleButtonHandler(button: string): void {
    this[button] = !this[button];
  }

  changeColor(color: string): void {
    this.toggleButtonHandler('showColorPicker');
    this.currentColor = color;
    this.chartOptions = { ...this.setChartOptions() };
  }

  addSensorToChart(sensor: string): void {
    this.toggleButtonHandler('showSensorSelector');
    this[sensor] = !this[sensor];
    console.log(this.chartOptions);
  }

}
