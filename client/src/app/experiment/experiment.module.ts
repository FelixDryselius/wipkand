import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperimentRoutingModule } from './experiment-routing.module';
import { ExperimentComponent } from './experiment.component';

@NgModule({
  imports: [
    CommonModule,
    ExperimentRoutingModule,
  ],
  declarations: [
    ExperimentComponent
  ],
  bootstrap: []
})
export class ExperimentModule { }
