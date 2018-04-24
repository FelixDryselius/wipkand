import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd part and application imports
import { ScoreboardModule } from './scoreboard/scoreboard.module';
import { StatisticsChartsModule } from './statistics-charts/statistics-charts.module';

const routes: Routes = [
  {
    path: 'scoreboard',
    loadChildren: () => ScoreboardModule
  },
  {
    path: 'charts',
    loadChildren: () => StatisticsChartsModule
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
