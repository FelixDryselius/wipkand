import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'current-batch-info',
  templateUrl: './current-batch-info.component.html',
  styleUrls: ['./current-batch-info.component.css']
})
export class CurrentBatchInfoComponent implements OnInit, OnDestroy {
  private routeSub: any;
  // orderID:string;
  // productName:string; //I dont think we need these
  // batchNumber:string;
  batchInfo:any;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params =>{
      this.batchInfo = params["newBatchInfo"]  //not sure about var name, will change
    })
    this.batchInfo = true //just a temporary thing
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe() 
   }


}

