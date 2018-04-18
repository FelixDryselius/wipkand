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

  constructor(private route: ActivatedRoute, private operationsService: OperationsService) { }

  ngOnInit() {
    this.req_batch = this.operationsService.getActiveBatch().subscribe(data => {
      let dbData;
      dbData = data;
      this.prodInfo = dbData[0];
      if(this.prodInfo){ // this if-loop inside here so that the 'get requests' have time to return
        this.operationsService.changeProdStatus(true);
        this.operationsService.changeProdInfo(this.prodInfo)
      }
    })

    //Use operationsService to share information between start-batch, finish-batch and current-batch-info
    this.service_prodStatus = this.operationsService.prodActiveObservable.subscribe(active => this.prodActive = active)
    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => this.prodInfo = info)


    
    // if(this.dbData){
    //    this.prodInfo = {
    //    batch: this.dbData[0].batch,
    //    order: this.dbData[0].order,
    //    article: this.dbData[0].article,
    //   }
    // }
  }
  ngOnDestroy() {
    //Test these carefully
    //this.service_prodStatus.unsubscribe();
    //this.service_prodInfo.unsubscribe();
  }
}

