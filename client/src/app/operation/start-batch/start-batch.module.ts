import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';


//3rd party and application imports:
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { StartBatchComponent } from './start-batch.component';
import { StartBatchRoutingModule } from './start-batch-routing.module';


@NgModule({
  imports: [
    CommonModule,
    StartBatchRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    Ng2PageScrollModule,
  ],
  declarations: [
    StartBatchComponent
  ],
  bootstrap: []
})
export class StartBatchModule { }
