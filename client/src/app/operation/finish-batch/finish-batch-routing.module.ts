import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd party and application imports:
import { FinishBatchComponent } from './finish-batch.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'finish-batch',
    children: [
      { path: '', component: FinishBatchComponent, canActivate: [AuthGuard], }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinishBatchRoutingModule { }
