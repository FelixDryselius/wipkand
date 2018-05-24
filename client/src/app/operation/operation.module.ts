import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

//3rd party and application imports:
import { ApplicationPipeModule } from '../shared/application-pipes/application-pipe.module';
import { BatchGuard } from '../auth/batch-guard.service';
import { BatchHistoryComponent } from './batch-history/batch-history.component';
import { BatchHistoryDetailComponent } from './batch-history-detail/batch-history-detail.component';
import { BatchReworkComponent } from './batch-rework/batch-rework.component';
import { FinishBatchComponent } from './finish-batch/finish-batch.component';
import { OperationsComponent } from './operations/operations.component';
import { OperationRoutingModule } from './operation-routing.module';
import { StartBatchComponent } from './start-batch/start-batch.component';

import { CalendarModule } from 'primeng/calendar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  imports: [
    ApplicationPipeModule,        
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    OperationRoutingModule,
    CalendarModule

  ],
  declarations: [
    BatchHistoryComponent,
    BatchHistoryDetailComponent,
    BatchReworkComponent,
    FinishBatchComponent,
    OperationsComponent,
    StartBatchComponent
   ],
  providers: [
    BatchGuard
  ],
  exports: []
})
export class OperationModule { }
