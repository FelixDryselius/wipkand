import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { StartBatchComponent } from './start-batch/start-batch.component';
import { HomeComponent } from './home/home.component';
import { CommentsComponent } from './comments/comments.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { FloorstockComponent } from './floorstock/floorstock.component';
import { ShiftChangeComponent } from './shift-change/shift-change.component';
import { BatchHistoryComponent } from './batch-history/batch-history.component';
import { FinishBatchComponent } from './finish-batch/finish-batch.component';
import { BatchReworkComponent } from './batch-rework/batch-rework.component';
import { CurrentBatchInfoComponent } from './current-batch-info/current-batch-info.component';



@NgModule({
  declarations: [
    AppComponent,
    StartBatchComponent,
    HomeComponent,
    CommentsComponent,
    ScoreboardComponent,
    FloorstockComponent,
    ShiftChangeComponent,
    BatchHistoryComponent,
    FinishBatchComponent,
    BatchReworkComponent
    CurrentBatchInfoComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

