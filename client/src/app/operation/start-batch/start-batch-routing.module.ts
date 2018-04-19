import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd party and application imports:
import { StartBatchComponent } from './start-batch.component';

const routes: Routes = [
  {
    path: 'start-batch',
    children: [
      {path: '', component: StartBatchComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartBatchRoutingModule { }
