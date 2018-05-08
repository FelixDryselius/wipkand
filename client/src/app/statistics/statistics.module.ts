import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party and application imports:
import { FloorstockChartComponent } from './charts/floorstock/floorstock-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsChartsComponent } from './charts/production/production-charts.component';
import { StatisticsRoutingModule } from './statistics-routing.module';

//big test
import { ComboChartComponent } from './charts/combo-chart/combo-chart.component';
import { ComboSeriesVerticalComponent } from './charts/combo-chart/combo-series-vertical.component';


@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    StatisticsRoutingModule
    
  ],
  declarations: [StatisticsChartsComponent, FloorstockChartComponent, ComboChartComponent, ComboSeriesVerticalComponent ],
  providers: [],
  exports: []
})
export class StatisticsModule { }
