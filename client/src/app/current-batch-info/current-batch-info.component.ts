import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperationsService } from '../operations.service';


@Component({
  selector: 'current-batch-info',
  templateUrl: './current-batch-info.component.html',
  styleUrls: ['./current-batch-info.component.css']
})
export class CurrentBatchInfoComponent implements OnInit, OnDestroy {
  private prodActive: boolean;
  private prodInfo: {};
  
  private req_batch: any;
  private service_prodStatus: any;
  private service_prodInfo: any;


  private test_batch;

  constructor(private route: ActivatedRoute, private operationsService: OperationsService) { }

  ngOnInit() {
    this.req_batch = this.operationsService.getActiveBatch().subscribe(data => {
      this.test_batch = data as [any];
    })

    //TODO: Use HTTP.get() to fetch last batch from DB. If it is missing an end-date, set prodActive to true. Else set to false.
    // Is this really a valid way to check if a batch is running? 
    //Better to add attribute 'active' to batch model and check DB is there is an active batch running. This gives us the ability to pause a batch.

    //Use operationsService to share information between start-batch, finish-batch and current-batch-info
    this.service_prodStatus = this.operationsService.prodActiveObservable.subscribe(active => this.prodActive = active)
    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => this.prodInfo = info)
  }

  ngOnDestroy() {
    //Test these carefully
    //this.service_prodStatus.unsubscribe();
    //this.service_prodInfo.unsubscribe();
  }
}

