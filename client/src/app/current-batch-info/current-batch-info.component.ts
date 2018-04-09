import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'current-batch-info',
  templateUrl: './current-batch-info.component.html',
  styleUrls: ['./current-batch-info.component.css']
})
export class CurrentBatchInfoComponent implements OnInit, OnDestroy {
  private routeSub: any;
  private batchnr: number;
  private ordernr: number;
  // orderID:string;
  // productName:string; //I dont think we need these
  // batchNumber:string;
  batchInfo:any;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
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
   }


}

