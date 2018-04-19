import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//3rd party and application imports:
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: 'home',
    children: [
      {path: '', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
