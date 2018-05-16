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

  getBatchesSub: any;

  constructor(
    private authAPI: AuthAPIService,
    private operationsService: OperationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getBatchesSub = this.operationsService.getBatchList()
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.batches = (data as QueryResponse).results as [Batch]
      })
  }

  ngOnDestroy(): void {
    this.getBatchesSub.unsubscribe()
  }

  toBatchDetail(id) {
    this.router.navigate(['operation/batch-history/' + id + '/'])
  }

  searchHistory(event, query) {
    this.getBatchesSub = this.operationsService.getBatchDetail('?search=' + query)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.batches = (data as QueryResponse).results as [Batch]
      })
  }

}
