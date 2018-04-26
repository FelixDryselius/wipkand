import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party and application imports:
import { StatisticsRoutingModule } from './statistics-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutingModule
  ],
  declarations: [ ],
  providers: [],
  exports: []
})
export class StatisticsModule { }
