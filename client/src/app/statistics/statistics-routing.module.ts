import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd part and application imports
import { ScoreboardModule } from './scoreboard/scoreboard.module';
import { StatisticsChartsModule } from './statistics-charts/statistics-charts.module';

import { OrderListComponent } from './order-list.component';


const routes: Routes = [
  {
    path: 'scoreboard',
    loadChildren: './statistics-charts/statistics-charts.module#ScoreboardModule',
    
  },
  {
    path: 'charts',
    loadChildren: () => StatisticsChartsModule,
    pathMatch: 'full',
  },
  {
    path: 'test',
    component: OrderListComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
