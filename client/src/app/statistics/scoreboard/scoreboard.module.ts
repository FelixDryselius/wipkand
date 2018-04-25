import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party and application imports
import { ApplicationPipeModule } from '../../shared/application-pipes/application-pipe.module';
import { ScoreboardComponent } from './scoreboard.component';
import { ScoreboardRoutingModule } from './scoreboard-routing.module';

@NgModule({
  imports: [
    ApplicationPipeModule,
    CommonModule,
    ScoreboardRoutingModule
  ],
  declarations: [ScoreboardComponent],
  providers: [],
  exports: [],
  bootstrap: [ScoreboardComponent]
})
export class ScoreboardModule { }
