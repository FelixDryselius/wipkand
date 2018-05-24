import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

// Application imports
import { AuthAPIService } from '../../auth/auth.service';
import { Batch } from '../../shared/interfaces/batch';
import { OperationsService } from '../../shared/application-services/operations.service';
import { QueryResponse } from '../../shared/interfaces/query-response';

@Component({
  selector: 'app-batch-history',
  templateUrl: './batch-history.component.html',
  styleUrls: ['./batch-history.component.css']
})
export class BatchHistoryComponent implements OnInit {
  batches: [Batch]
  queryResponse: QueryResponse;
  searched;

  getBatchesSub: any;

  constructor(
    private authAPI: AuthAPIService,
    private operationsService: OperationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searched = '';
    this.getBatchesSub = this.operationsService.getBatch('?limit=10')
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.queryResponse = data as QueryResponse
        this.batches = this.queryResponse.results as [Batch]
      })
  }

  ngOnDestroy(): void {
    this.getBatchesSub.unsubscribe()
  }

  toBatchDetail(id) {
    this.router.navigate(['operation/batch-history/' + id + '/'])
  }

  goNext() {
    if (this.queryResponse.next) {
      this.getBatchesSub = this.operationsService.getQueryPage(this.queryResponse.next)
        .retryWhen(error => this.authAPI.checkHttpRetry(error))
        .subscribe(data => {
          this.queryResponse = data as QueryResponse
          this.batches = this.queryResponse.results as [Batch]
        })
    }
  }

  goPrevious() {
    if (this.queryResponse.previous) {
      this.getBatchesSub = this.operationsService.getQueryPage(this.queryResponse.previous)
        .retryWhen(error => this.authAPI.checkHttpRetry(error))
        .subscribe(data => {
          this.queryResponse = data as QueryResponse
          this.batches = this.queryResponse.results as [Batch]
        })
    }
  }

  searchHistory(event, query) {
    this.searched = query
    this.getBatchesSub = this.operationsService.getBatch('?limit=10&search=' + query)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.queryResponse = data as QueryResponse
        this.batches = this.queryResponse.results as [Batch]
      })

  }

}

