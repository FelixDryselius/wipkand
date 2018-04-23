import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationsService } from '../shared/services/operations.service';
import { Batch } from '../../shared/interfaces/batch'


@Component({
  selector: 'current-batch-info',
  templateUrl: './current-batch-info.component.html',
  styleUrls: ['./current-batch-info.component.css']
})
export class CurrentBatchInfoComponent implements OnInit, OnDestroy {
  private prodActive: boolean;
  private prodInfo: {};

  //observables
  private req_batch: any;
  private service_prodInfo: any;
  private service_prodStatus: any;

  constructor(private route: ActivatedRoute, private operationsService: OperationsService, private router: Router) { }

  ngOnInit() {
    let activeBatchquery = "?q=activeBatch"
    this.req_batch = this.operationsService.getBatchDetail(activeBatchquery).subscribe(data => {
      let runningBatch = data[0] as Batch
      if (runningBatch) {
        this.operationsService.setCurrentBatchInfo(runningBatch)
      }
    })
    //TODO: Make this one observable
    this.service_prodStatus = this.operationsService.prodActiveObservable.subscribe(active => this.prodActive = active)
    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => this.prodInfo = info)

  }
  ngOnDestroy() {
    //Test these carefully
    //this.service_prodStatus.unsubscribe();
    //this.service_prodInfo.unsubscribe();
  }

  start_batch() {
    this.router.navigate(['/start-batch'])
  }
  finish_batch() {
    this.router.navigate(['/finish-batch'])
  }
}

