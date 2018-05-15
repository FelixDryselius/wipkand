import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd part and application imports
import { AuthGuard } from '../auth/auth-guard.service';
import { DataPageComponent } from './data-page/data-page.component';
import { FloorstockChartComponent } from './charts/floorstock/floorstock-chart.component';
import { ProductionAccumulatedComponent } from './charts/production-accumulated/production-accumulated.component';
import { ProductionPerTimeUnitComponent } from './charts/production-per-time-unit/production-per-time-unit.component';
import { ScoreboardModule } from './scoreboard/scoreboard.module';
import { StatisticsChartsComponent } from './charts/production/production-charts.component';



const routes: Routes = [
  {
    path: 'charts',
    canActivate: [AuthGuard],
    children: [
    {
      path:'',
      redirectTo: 'production'
    },
    {
      path: 'production',
      component: StatisticsChartsComponent
    },
    {
      path:'production-accumulated',
      component: ProductionAccumulatedComponent
    },
    {
      path:'production-per-time-unit',
      component: ProductionPerTimeUnitComponent
    },
    {
      path: 'floorstock',
      component: FloorstockChartComponent
    }
   ]
  },
  {
    path: 'data-page',
    component: DataPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'scoreboard',
    loadChildren: './scoreboard/scoreboard.module#ScoreboardModule',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
