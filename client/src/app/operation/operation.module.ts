import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

//3rd party and application imports:
import { ApplicationPipeModule } from '../shared/application-pipes/application-pipe.module';
import { CommentComponent } from './comment/comment.component';
import { CommentService } from '../shared/application-services/comment.service';
import { CurrentBatchInfoModule } from './current-batch-info/current-batch-info.module';
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
    CurrentBatchInfoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    Ng2PageScrollModule,
    OperationRoutingModule
  ],
  declarations: [
    CommentComponent,
    FinishBatchComponent,
    HomeComponent,
    StartBatchComponent
   ],
  providers: [CommentService],
  exports: [CurrentBatchInfoModule]
})
export class OperationModule { }
