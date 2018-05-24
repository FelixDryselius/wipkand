import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd party and application imports
import { AuthGuard } from '../auth/auth-guard.service';
import { BatchGuard } from '../auth/batch-guard.service';
import { BatchHistoryComponent } from './batch-history/batch-history.component';
import { BatchHistoryDetailComponent } from './batch-history-detail/batch-history-detail.component';
import { BatchReworkComponent } from './batch-rework/batch-rework.component';
import { FinishBatchComponent } from './finish-batch/finish-batch.component';
import { OperationsComponent } from './operations/operations.component';
import { RoleGuard } from '../auth/role-guard.service';
import { StartBatchComponent } from './start-batch/start-batch.component';


const routes: Routes = [
  {
    path: 'operations',
    component: OperationsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: ['admin', 'operator']
    }
  },
  {
    path: 'finish-batch',
    component: FinishBatchComponent,
    canActivate: [AuthGuard, RoleGuard, BatchGuard],
    data: {
      expectedRole: ['admin', 'operator']
    }
  },
  {
    path: 'start-batch',
    component: StartBatchComponent,
    canActivate: [AuthGuard, RoleGuard, BatchGuard],
    data: {
      expectedRole: ['admin', 'operator']
    }
  },
  {
    path: "batch-history",
    component: BatchHistoryComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
        expectedRole: ['admin', 'operator', 'supervisor']
    }
  },
  {
    path: "batch-history/:id",
    component: BatchHistoryDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
        expectedRole: ['admin', 'operator', 'supervisor']
    }
  },
  {
    path: "batch-rework",
    component: BatchReworkComponent,
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
