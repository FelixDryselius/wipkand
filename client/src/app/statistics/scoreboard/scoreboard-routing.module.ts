import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd party and application imports
import { ScoreboardComponent } from './scoreboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ":batchesBack",
    pathMatch: 'full'    
  },
  {
    path: ":batchesBack",
    component: ScoreboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreboardRoutingModule { }
