import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Application imports
import { CommentComponent } from './comment.component';

const routes: Routes = [
  {
    path: 'comment',
    children: [
      {path: '', component: CommentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }
