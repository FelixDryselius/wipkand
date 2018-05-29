import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd part and application imports
import { AuthGuard } from '../auth/auth-guard.service';
import { DataPageComponent } from './data-page/data-page.component';
import { FloorstockChartComponent } from './charts/floorstock/floorstock-chart.component';
import { ProductionAccumulatedComponent } from './charts/production-accumulated/production-accumulated.component';
import { ProductionPerTimeUnitComponent } from './charts/production-per-time-unit/production-per-time-unit.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { StatisticsChartsComponent } from './charts/production/production-charts.component';
import { RoleGuard } from '../auth/role-guard.service';



const routes: Routes = [
  {
    path: 'charts',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: ['admin', 'supervisor']
    },
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
    path: 'scoreboard',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: ['admin', 'supervisor', 'operator']
    },
    children: [
      {
        path: '',
        component: ScoreboardComponent,
      },
      {
        path: ":batchesBack",
        component: ScoreboardComponent,
      }
    ]
  },
  {
    path: 'data-page',
    component: DataPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: ['admin', 'supervisor', 'operator']
    },
  },
  // {
  //   path: 'scoreboard',
  //   loadChildren: './scoreboard/scoreboard.module#ScoreboardModule',
  //   canActivate: [AuthGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
