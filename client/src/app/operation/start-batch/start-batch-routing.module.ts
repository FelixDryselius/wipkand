import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd party and application imports:
import { StartBatchComponent } from './start-batch.component';
import { AuthGuard } from '../../auth/auth-guard.service';
import { RoleGuard } from '../../auth/role-guard.service';

const routes: Routes = [
  {
    path: 'start-batch',
    children: [
      {
        path: '',
        component: StartBatchComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          expectedRole: ['admin', 'operator']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartBatchRoutingModule { }
