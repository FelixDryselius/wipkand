import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party and application imports:
import { CommentModule } from './comment/comment.module';
import { CurrentBatchInfoModule } from './current-batch-info/current-batch-info.module';
import { FinishBatchModule } from './finish-batch/finish-batch.module';
import { HomeModule } from './home/home.module';
import { OperationRoutingModule } from './operation-routing.module';
import { StartBatchModule } from './start-batch/start-batch.module';



@NgModule({
  imports: [
    CommonModule,
    CurrentBatchInfoModule,
    FinishBatchModule,
    OperationRoutingModule,
    StartBatchModule,
    CommentModule,
    HomeModule
  ],
  declarations: [ ],
  providers: [],
  exports: [CurrentBatchInfoModule]
})
export class OperationModule { }
