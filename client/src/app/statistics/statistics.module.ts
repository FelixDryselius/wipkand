import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party and application imports:
import { DataPageComponent } from './data-page/data-page.component';
import { FloorstockChartComponent } from './charts/floorstock/floorstock-chart.component';
import { ProductionAccumulatedComponent } from './charts/production-accumulated/production-accumulated.component';
import { ProductionPerTimeUnitComponent } from './charts/production-per-time-unit/production-per-time-unit.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { StatisticsChartsComponent } from './charts/production/production-charts.component';
import { StatisticsRoutingModule } from './statistics-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    NgxChartsModule,
    NgbModule
  ],
  declarations: [
    FloorstockChartComponent, 
    DataPageComponent,
    ProductionPerTimeUnitComponent,
    ProductionAccumulatedComponent,
    StatisticsChartsComponent,
    ScoreboardComponent
  ],

  providers: [],
  exports: []
})
export class StatisticsModule { }
