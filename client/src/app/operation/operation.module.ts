import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

//3rd party and application imports:
import { CommentModule } from './comment/comment.module';
import { CurrentBatchInfoModule } from './current-batch-info/current-batch-info.module';
import { FinishBatchComponent } from './finish-batch/finish-batch.component';
import { HomeModule } from './home/home.module';
import { OperationRoutingModule } from './operation-routing.module';
import { StartBatchComponent } from './start-batch/start-batch.component';



@NgModule({
  imports: [
    CommonModule,
    CommentModule,
    CurrentBatchInfoModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    HttpModule,
    HttpClientModule,
    OperationRoutingModule
  ],
  declarations: [
    FinishBatchComponent,
    StartBatchComponent
   ],
  providers: [],
  exports: [CurrentBatchInfoModule]
})
export class OperationModule { }
