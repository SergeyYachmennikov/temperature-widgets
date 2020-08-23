import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const material = [
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    material
  ],
  exports: [material]
})
export class MaterialModule { }
