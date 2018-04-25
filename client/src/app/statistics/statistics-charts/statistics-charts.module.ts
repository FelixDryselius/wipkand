import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party and application imports
import { StatisticsChartsRoutingModule } from './statistics-charts-routing.module';
import { StatisticsChartsComponent } from './statistics-charts.component';

@NgModule({
  imports: [
    CommonModule,
    StatisticsChartsRoutingModule
  ],
  declarations: [StatisticsChartsComponent]
})
export class StatisticsChartsModule { }
