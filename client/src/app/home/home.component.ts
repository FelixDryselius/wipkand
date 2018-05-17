import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

// Application imports
import { AuthAPIService } from '../auth/auth.service';
import { Batch } from '../shared/interfaces/batch';
import { OperationsService } from '../shared/application-services/operations.service';
import { QueryResponse } from '../shared/interfaces/query-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  batches: [Batch]
  latestBatch: any;
  active;

  getBatchesSub: any;
  service_prodInfo: any;

  constructor(
    private authAPI: AuthAPIService,
    private operationsService: OperationsService,
    private router: Router) { }

  ngOnInit() {

    this.getBatchesSub = this.operationsService.getBatchList()
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.batches = (data as QueryResponse).results as [Batch]
        this.latestBatch = this.batches[0]
        console.log(this.latestBatch )
        if (this.latestBatch.end_date == null) {
          this.active = 'Current'
        }
        else {
          this.active = 'Latest'
        }
      })
  }

  ngOnDestroy(): void {
    this.getBatchesSub.unsubscribe()
  }

}
