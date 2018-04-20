import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


//3rd party and application imports:
import { CurrentBatchInfoComponent } from './current-batch-info.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CurrentBatchInfoComponent
  ],
  exports: [CurrentBatchInfoComponent]
})
export class CurrentBatchInfoModule { }
