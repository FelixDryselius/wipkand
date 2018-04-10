import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { NavInformationServiceService } from '../nav-information-service/nav-information-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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

  prodData: any [];

  readonly ROOT_URL = 'http://localhost:8000/api/operations/product/'


  @Input()
  passedQuery: number;

  constructor(private router: Router, private data: NavInformationServiceService, private http: HttpClient) {   
      }

  ngOnInit() {    
    this.http.get(this.ROOT_URL).subscribe(
        data => {
          this.prodData = data as any [];		// FILL THE ARRAY WITH DATA.
        },
      );

    this.data.currentBatchObservable.subscribe(currentBatchInfo =>this.currentBatchInfo = currentBatchInfo)

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

  // Called in form in html. Gets all input data from user. Sends it to home component where current-batch-info is. 
  submitBatch(event, formData) {
    let chosenBatch = formData.value['batchnr']
    let chosenOrder = formData.value['ordernr']
    let chosenProduct = formData.value['prodnr']

    console.log(chosenProduct)

    this.newBatchInformation({batchNr:chosenBatch,orderNr:chosenOrder,prodNr:chosenProduct})
    this.router.navigate(['./home']) 
    
  }

}

