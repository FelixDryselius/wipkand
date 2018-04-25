import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party and application imports:
import { ScoreboardModule } from './scoreboard/scoreboard.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsChartsModule } from './statistics-charts/statistics-charts.module';

import { OrderListComponent } from './order-list.component';


@NgModule({
  imports: [
    CommonModule,
    StatisticsChartsModule,
   // ScoreboardModule,
    StatisticsRoutingModule
  ],
  declarations: [ OrderListComponent],
  providers: [],
  exports: []
})
export class StatisticsModule { }
