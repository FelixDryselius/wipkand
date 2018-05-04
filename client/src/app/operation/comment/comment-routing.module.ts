import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Application imports
import { CommentComponent } from './comment.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'comment',
    children: [
      {path: '', component: CommentComponent, canActivate: [AuthGuard], }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }
