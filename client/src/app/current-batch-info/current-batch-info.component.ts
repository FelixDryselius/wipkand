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
  private prodnr: number;

  batchInfo:boolean;

  // orderID:string;
  // productName:string; //I dont think we need these
  // batchNumber:string;
  currentBatchInfo:any;
  private currentBatchObservable:any;

  message:string;

  constructor(private route:ActivatedRoute, private data: NavInformationServiceService) { }

  ngOnInit() {
    this.data.currentBatchObservable.subscribe(currentBatchInfo =>this.currentBatchInfo = currentBatchInfo)

    this.routeSub = this.route.params.subscribe(params =>{
      //this.batchInfo = params  //not sure about var name, will change
         this.batchnr = params.batchnr
         this.ordernr = params.ordernr
         this.prodnr = params.prodnr

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

