import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

//3rd party and application imports:
import { FinishBatchComponent } from './finish-batch.component';
import { FinishBatchRoutingModule } from './finish-batch-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FinishBatchRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [
    FinishBatchComponent
  ]
})
export class FinishBatchModule { }
