import { AuthAPIService } from '../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationsService } from '../shared/services/operations.service';
import { Batch } from '../../shared/interfaces/batch'
import { QueryResponse } from '../../shared/interfaces/query-response'

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/retryWhen';

@Component({
  selector: 'current-batch-info',
  templateUrl: './current-batch-info.component.html',
  styleUrls: ['./current-batch-info.component.css']
})
export class CurrentBatchInfoComponent implements OnInit, OnDestroy {
 // private prodActive: boolean;
  private prodInfo: {};

  //observables
  private req_batch: any;
  private service_prodInfo: any;

  private tokenRefreshRecallSub: any;

  constructor(
    private route: ActivatedRoute,
    private operationsService: OperationsService,
    private router: Router,
    private authAPI: AuthAPIService) { }

  ngOnInit() {
    this.getActiveBatch()
    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => this.prodInfo = info)
  }

  getActiveBatch() {
    let activeBatchquery = "?batch_number=activeBatch"
    this.req_batch = this.operationsService.getBatchDetail(activeBatchquery)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        let runningBatch = (data as QueryResponse).results[0] as Batch
        if (runningBatch) {
          this.operationsService.setCurrentBatchInfo(runningBatch)
        } else {
          this.operationsService.setCurrentBatchInfo(null)
        }
      })
  }

  ngOnDestroy() {
    //Test these carefully
    //this.service_prodStatus.unsubscribe();
    //this.service_prodInfo.unsubscribe();
    if (this.tokenRefreshRecallSub) {
      this.tokenRefreshRecallSub.unsubscribe()
    }
  }

  start_batch() {
    this.router.navigate(['/start-batch'])
  }
  finish_batch() {
    this.router.navigate(['/finish-batch'])
  }
}

