import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd party and application imports
import { AuthGuard } from '../auth/auth-guard.service';
import { CommentComponent } from './comment/comment.component';
import { FinishBatchComponent } from './finish-batch/finish-batch.component';
import { HomeComponent } from './home/home.component';
import { RoleGuard } from '../auth/role-guard.service';
import { StartBatchComponent } from './start-batch/start-batch.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: ['admin', 'operator']
    }
  },
  {
    path: 'comment',
    component: CommentComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: ['admin', 'operator', 'supervisor']
    }
  },
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
