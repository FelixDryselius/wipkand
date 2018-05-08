import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party and application imports:
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsChartsComponent } from './statistics-charts/production/production-charts.component';
import { StatisticsRoutingModule } from './statistics-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    StatisticsRoutingModule
    
  ],
  declarations: [StatisticsChartsComponent ],
  providers: [],
  exports: []
})
export class StatisticsModule { }
