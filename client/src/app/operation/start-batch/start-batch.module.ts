import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';


//3rd party and application imports:
import { StartBatchComponent } from './start-batch.component';
import { StartBatchRoutingModule } from './start-batch-routing.module';


@NgModule({
  imports: [
    CommonModule,
    StartBatchRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [
    StartBatchComponent
  ],
  bootstrap: []
})
export class StartBatchModule { }
