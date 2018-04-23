import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd part and application imports
import { ScoreboardModule } from './scoreboard/scoreboard.module';

const routes: Routes = [
  {
    path: 'scoreboard',
    loadChildren: () => ScoreboardModule
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
