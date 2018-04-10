import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavInformationServiceService } from '../nav-information-service/nav-information-service.service'

@Component({
  selector: 'current-batch-info',
  templateUrl: './current-batch-info.component.html',
  styleUrls: ['./current-batch-info.component.css']
})
export class CurrentBatchInfoComponent implements OnInit, OnDestroy {
  private routeSub: any;
  private batchnr: number;
  private ordernr: number;

  public prodActive: boolean;

  batchInfo:boolean;

  // orderID:string;
  // productName:string; //I dont think we need these
  // batchNumber:string;
  currentBatchInfo:any;
  private currentBatchObservable:any;

  message:string;

  constructor(private route:ActivatedRoute, private data: NavInformationServiceService) { }

  ngOnInit() {
    //TODO: Use HTTP.get() to fetch last batch from DB. If it is missing an end-date, set prodActive to true. Else set to false.
    // Is this really a valid way to check if a batch is running? 
    //Better to add attribute 'active' to batch model and check DB is there is an active batch running. This gives us the ability to pause a batch.
    this.data.currentBatchObservable.subscribe(currentBatchInfo =>this.currentBatchInfo = currentBatchInfo)

    this.routeSub = this.route.params.subscribe(params =>{
      //this.batchInfo = params  //not sure about var name, will change
         this.batchnr = params.batchnr
         this.ordernr = params.ordernr

    })
    this.batchInfo = true //just a temporary thing
    console.log(this.batchnr);
    console.log(this.ordernr);
    

  }

  ngOnDestroy(){
    this.routeSub.unsubscribe() 
   // this.currentBatchObservable.unsubscribe() // I cant do this but want to.. how?
   }


}

