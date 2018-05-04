import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd part and application imports
import { ScoreboardModule } from './scoreboard/scoreboard.module';
import { StatisticsChartsModule } from './statistics-charts/statistics-charts.module';
import { AuthGuard } from '../auth/auth-guard.service';


const routes: Routes = [
  {
    path: 'scoreboard',
    loadChildren: './scoreboard/scoreboard.module#ScoreboardModule',
    canActivate: [AuthGuard],
    
  },
  {
    path: 'charts',
    loadChildren: './statistics-charts/statistics-charts.module#StatisticsChartsModule',
    canActivate: [AuthGuard],
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
