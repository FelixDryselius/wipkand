import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party and application imports:
import { DataPageComponent } from './data-page/data-page.component';
import { FloorstockChartComponent } from './charts/floorstock/floorstock-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsChartsComponent } from './charts/production/production-charts.component';
import { StatisticsRoutingModule } from './statistics-routing.module';

//big test
import { ComboChartComponent } from './charts/combo-chart/combo-chart.component';
import { ComboSeriesVerticalComponent } from './charts/combo-chart/combo-series-vertical.component';
import { StaffQuantityComponent } from './charts/staff-quantity/staff-quantity.component';
import { BatchChartComponent } from './charts/batch/batch-chart.component';
import { ProducedPerPersonComponent } from './charts/produced-per-person/produced-per-person.component';
import { ProductionPerTimeUnitComponent } from './charts/production-per-time-unit/production-per-time-unit.component';



@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    StatisticsRoutingModule
    
  ],
  declarations: [
    FloorstockChartComponent, 
    ComboChartComponent, 
    ComboSeriesVerticalComponent, 
    DataPageComponent,
    StatisticsChartsComponent,
    StaffQuantityComponent,
    BatchChartComponent,
    ProducedPerPersonComponent,
    ProductionPerTimeUnitComponent],

  providers: [],
  exports: []
})
export class StatisticsModule { }
