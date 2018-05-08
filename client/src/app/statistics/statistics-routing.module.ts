import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd part and application imports
import { ScoreboardModule } from './scoreboard/scoreboard.module';
import { StatisticsChartsComponent } from './statistics-charts/production/production-charts.component';
import { AuthGuard } from '../auth/auth-guard.service';


const routes: Routes = [
  {
    path: 'scoreboard',
    loadChildren: './scoreboard/scoreboard.module#ScoreboardModule',
    canActivate: [AuthGuard],
    
  },
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
      path: 'floorstock',
   //   component: FloorstockStatisticsComponent
    },
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
