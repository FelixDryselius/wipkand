import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

//3rd party and application imports:
import { ApplicationPipeModule } from '../shared/application-pipes/application-pipe.module';
import { BatchHistoryComponent } from './batch-history/batch-history.component';
import { BatchHistoryDetailComponent } from './batch-history-detail/batch-history-detail.component';
import { BatchReworkComponent } from './batch-rework/batch-rework.component';
import { CommentComponent } from './comment/comment.component';
import { CommentService } from '../shared/application-services/comment.service';
import { CurrentBatchInfoComponent } from './current-batch-info/current-batch-info.component';
import { FinishBatchComponent } from './finish-batch/finish-batch.component';
import { HomeComponent } from './home/home.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { OperationRoutingModule } from './operation-routing.module';
import { StartBatchComponent } from './start-batch/start-batch.component';



@NgModule({
  imports: [
    ApplicationPipeModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    Ng2PageScrollModule,
    OperationRoutingModule
  ],
  declarations: [
    BatchHistoryComponent,
    BatchHistoryDetailComponent,
    BatchReworkComponent,
    CommentComponent,
    CurrentBatchInfoComponent,
    FinishBatchComponent,
    HomeComponent,
    StartBatchComponent
   ],
  providers: [CommentService],
  exports: [CurrentBatchInfoComponent]
})
export class OperationModule { }
