import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Application imports
import { CommentComponent } from './comment.component';
import { AuthGuard } from '../../auth/auth-guard.service';
import { RoleGuard } from '../../auth/role-guard.service';

const routes: Routes = [
  {
    path: 'comment',
    children: [
      {
        path: '',
        component: CommentComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          expectedRole: ['admin', 'operator', 'supervisor']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }
