import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd party and application imports
import { AuthGuard } from '../auth/auth-guard.service';
import { FinishBatchComponent } from './finish-batch/finish-batch.component';
import { RoleGuard } from '../auth/role-guard.service';
import { StartBatchComponent } from './start-batch/start-batch.component';

const routes: Routes = [
  {
    path: 'finish-batch',
    component: FinishBatchComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: ['admin', 'operator']
    }
  },
  {
    path: 'start-batch',
    component: StartBatchComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: ['admin', 'operator']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
