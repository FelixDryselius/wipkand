import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party and application imports
import { ScoreboardComponent } from './scoreboard.component';
import { ScoreboardRoutingModule } from './scoreboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ScoreboardRoutingModule
  ],
  declarations: [ScoreboardComponent],
  providers: [],
  exports: [],
  bootstrap: []
})
export class ScoreboardModule { }
