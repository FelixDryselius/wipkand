import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; 
import { timeout } from 'rxjs/operators/timeout';

import { Batch } from '../assets/interface/batch';


@Injectable()
export class OperationsService {
  //TODO: prodActive is now false by default (on page refresh etc.). Should get its value from the DB instead. Same with prodInfo

  //This variable is determining if a batch is currently running. It is shared between start-batch, finish-batch and current-batch-info.
  //It is modified as an observable make it shareable between the components. 
  private prodActive = new BehaviorSubject<boolean>(false);
  prodActiveObservable = this.prodActive.asObservable();

  //This variable is holding the data values for the current running batch. It is shared between start-batch, finish-batch and current-batch-info.
  //It is modified as an observable make it shareable between the components. 
  private prodInfo = new BehaviorSubject<{}>(null);
  prodInfoObservable = this.prodInfo.asObservable();

  //TODO: Should URLs really be placed here? Should we collect them in a file somewhere? 
  public ROOT_URL: string = "http://localhost:8000";
  private orderCREATE_URL: string = "/api/operations/order/create/";
  private batchCREATE_URL: string = "/api/operations/batch/create/";
  readonly batchGET_URL: string = "/api/operations/batch/";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
     // 'Authorization': ''
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

  constructor(private http: HttpClient) { }

  //This method changes the status of a batch running or a batch not running.
  changeProdStatus(startBatch: boolean) {
    this.prodActive.next(startBatch);
  }

  //This method sets the data values for the current running batch.
  changeProdInfo(info: {}) {
    this.prodInfo.next(info);
  }

  //TODO: Can we make a general method of these two? Pass URL and data to post as arguments and use same function.
  createOrder(newOrder: {}) {
    console.log("POST - Create new order")
    console.log("Data is: " + JSON.stringify(newOrder))
    console.log("Url is: " + this.ROOT_URL + this.orderCREATE_URL)
    return this.http.post(this.ROOT_URL + this.orderCREATE_URL, JSON.stringify(newOrder), this.httpOptions)
  }

  createBatch(newBatch: {}) {
    console.log("POST - Create new batch")
    console.log("Data is: " + JSON.stringify(newBatch))
    console.log("Url is: " + this.ROOT_URL + this.batchCREATE_URL)
    return this.http.post(this.ROOT_URL + this.batchCREATE_URL, JSON.stringify(newBatch), this.httpOptions)
  }

  getActiveBatch() {
    let activeBatchquery = "?q=activeBatch"
    return this.http.get(this.ROOT_URL + this.batchGET_URL + activeBatchquery)
  }

  //this.ROOT_URL+this.batchGET_URL+ updatedBatch.batch_number+"/edit/"
  

/** PUT: update the batch on the server. Returns the updated batch upon success. */
updateBatch (updatedBatch: Batch) {
  let UPDATE_BATCH_URL = this.ROOT_URL+this.batchGET_URL+ updatedBatch.batch_number+"/edit/"
  return this.http.put(UPDATE_BATCH_URL, JSON.stringify(updatedBatch), this.httpOptions)
    .pipe(
     //catchError(this.handleError((name:'updateBatch', updatedBatch:Batch))) //will work when we have added a type to the obs instead of any
    );
}



}
