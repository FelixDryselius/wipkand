import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd party and application imports:
import { HomeComponent } from './home.component';
import { AuthGuard } from '../../auth/auth-guard.service';
import { RoleGuard } from '../../auth/role-guard.service';

const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: '',
        component: HomeComponent,
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
export class HomeRoutingModule { }
