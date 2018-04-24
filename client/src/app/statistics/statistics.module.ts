import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party and application imports:
import { ScoreboardModule } from './scoreboard/scoreboard.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsService } from './shared/services/statistics.service';

@NgModule({
  imports: [
    CommonModule,
    ScoreboardModule,
    StatisticsRoutingModule
  ],
  declarations: [ ],
  providers: [StatisticsService],
  exports: []
})
export class StatisticsModule { }
