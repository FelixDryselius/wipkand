import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party and application imports:
import { FinishBatchModule } from './finish-batch/finish-batch.module';
import { OperationRoutingModule } from './operation-routing.module';
import { StartBatchModule } from './start-batch/start-batch.module';
import { CommentModule } from './comment/comment.module';


@NgModule({
  imports: [
    CommonModule,
    FinishBatchModule,
    OperationRoutingModule,
    StartBatchModule,
    CommentModule
  ],
  declarations: [ ],
  providers: []
})
export class OperationModule { }
