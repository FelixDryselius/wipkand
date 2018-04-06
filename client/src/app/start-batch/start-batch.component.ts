import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { NavInformationServiceService } from '../nav-information-service/nav-information-service.service'

@Component({
  selector: 'start-batch',
  templateUrl: './start-batch.component.html',
  styleUrls: ['./start-batch.component.css']
})

export class StartBatchComponent implements OnInit, OnDestroy {
  newBatch: number;
  currentBatchInfo:any;
  title = "Start new batch";
  private currentBatchObservable:any;

  @Input()
  passedQuery: number;

  constructor(private router: Router, private data: NavInformationServiceService) {   
      }

  ngOnInit() {
    this.data.currentBatchObservable.subscribe(currentBatchInfo =>this.currentBatchInfo = currentBatchInfo)

    console.log(this.passedQuery)
    if(this.passedQuery) {
      this.newBatch = this.passedQuery
    }
  }

  ngOnDestroy() {
   // this.currentBatchObservable.usubscribe() // I want to do this but cant
  }

  newBatchInformation(obj:any) {
    this.data.changeBatchInfo(obj)
  }

  submitBatch(event, formData) {
    let chosenBatch = formData.value['batchnr']
    let chosenOrder = formData.value['ordernr']

    if (chosenBatch && chosenOrder) {

      this.newBatchInformation({batchNr:chosenBatch,orderNr:chosenOrder})
      this.router.navigate(['./home']) 
    }
    
  }

}

