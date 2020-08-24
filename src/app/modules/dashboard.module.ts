import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardChartItemComponent } from "../components/dashboard/dashboard-chart-item/dashboard-chart-item.component";
import { MaterialModule } from "./material.module";
import { ColorPickerComponent } from "../components/shared/color-picker/color-picker.component";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardChartItemComponent,
    ColorPickerComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    MaterialModule,
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
