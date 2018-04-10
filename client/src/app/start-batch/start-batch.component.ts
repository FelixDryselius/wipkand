import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { OperationsService } from '../operations.service'

@Component({
  selector: 'start-batch',
  templateUrl: './start-batch.component.html',
  styleUrls: ['./start-batch.component.css']
})

export class StartBatchComponent implements OnInit, OnDestroy {
  private prodActive: boolean;
  private prodInfo: {};
  private batch: string;
  private order: string;


  //What is this below?
  newBatch: number;
  
  title = "Start new batch";


  @Input()
  passedQuery: number;

  constructor(private router: Router, private data: OperationsService) {   
      }

  ngOnInit() {
    //Use operationsService to share information between start-batch, finish-batch and current-batch-info
    this.data.prodActiveObservable.subscribe(active => this.prodActive = active)
    this.data.prodInfoObservable.subscribe(info =>this.prodInfo = info)

    console.log(this.passedQuery)
    if(this.passedQuery) {
      this.newBatch = this.passedQuery
    }
  }

  ngOnDestroy() {
   // this.currentBatchObservable.usubscribe() // I want to do this but cant
  }

  submitBatch(event, formData) {
    this.batch = formData.value['batchnr'];
    this.order = formData.value['ordernr'];

    if (this.batch && this.order) {
      this.prodInfo = {batch: this.batch, order: this.order}
      this.data.changeProdStatus(true);
      this.data.changeProdInfo(this.prodInfo)
      console.log("Production status: " +  this.prodActive)

      this.router.navigate(['./home'])
    }
    
  }

}

