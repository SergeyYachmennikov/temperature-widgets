import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardChartItemComponent } from "../components/dashboard/dashboard-chart-item/dashboard-chart-item.component";
import { MaterialModule } from "./material.module";
import { ColorPickerComponent } from "../components/shared/color-picker/color-picker.component";
import { StopPropagationDirective } from "../directives/stop-propagation.directive";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardChartItemComponent,
    ColorPickerComponent,
    StopPropagationDirective
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    MaterialModule,
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
