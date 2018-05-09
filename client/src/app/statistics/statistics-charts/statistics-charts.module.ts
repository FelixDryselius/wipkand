import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party and application imports
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsChartsRoutingModule } from './statistics-charts-routing.module';
import { StatisticsChartsComponent } from './statistics-charts.component';
 


@NgModule({
  imports: [
    CommonModule,    
    NgxChartsModule,
    StatisticsChartsRoutingModule
  ],
  declarations: [StatisticsChartsComponent],
  providers: []
})
export class StatisticsChartsModule { }
