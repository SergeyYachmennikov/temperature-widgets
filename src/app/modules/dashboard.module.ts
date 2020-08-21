import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardChartItemComponent } from "../components/dashboard/dashboard-chart-item/dashboard-chart-item.component";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardChartItemComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
