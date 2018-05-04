import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsChartsComponent } from './statistics-charts.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticsChartsComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsChartsRoutingModule { }
