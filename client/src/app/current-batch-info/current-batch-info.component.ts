import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperationsService } from '../operations.service';


@Component({
  selector: 'current-batch-info',
  templateUrl: './current-batch-info.component.html',
  styleUrls: ['./current-batch-info.component.css']
})
export class CurrentBatchInfoComponent implements OnInit, OnDestroy {
  private routeSub: any;
  private batchnr: number;
  private ordernr: number;
  private prodnr: number;

  private prodActive: boolean;
  private prodInfo: {};

  constructor(private route: ActivatedRoute, private data: OperationsService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params =>{
      //this.batchInfo = params  //not sure about var name, will change
         this.batchnr = params.batchnr
         this.ordernr = params.ordernr
         this.prodnr = params.prodnr

    })
    
    //TODO: Use HTTP.get() to fetch last batch from DB. If it is missing an end-date, set prodActive to true. Else set to false.
    // Is this really a valid way to check if a batch is running? 
    //Better to add attribute 'active' to batch model and check DB is there is an active batch running. This gives us the ability to pause a batch.

    //Use operationsService to share information between start-batch, finish-batch and current-batch-info
    this.data.prodActiveObservable.subscribe(active => this.prodActive = active)
    this.data.prodInfoObservable.subscribe(info => this.prodInfo = info)
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}

