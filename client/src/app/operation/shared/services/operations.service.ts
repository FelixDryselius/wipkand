import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { timeout } from 'rxjs/operators/timeout';
import { Batch } from '../../../shared/interfaces/batch';



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

  readonly URL_ROOT: string = "http://localhost:8000";
  readonly URL_ORDER_API: string = "/api/operations/order/";
  readonly URL_BATCH_API: string = "/api/operations/batch/";

  // Scoreboard URLs
  private scoreboardListURL: string = "/api/statistics/";
  

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

  createBatch(newBatch: {}) {
    console.log("POST - Create new batch")
    console.log("Data is: " + JSON.stringify(newBatch))
    console.log("Url is: " + this.URL_ROOT + this.URL_BATCH_API)
    return this.http.post(this.URL_ROOT + this.URL_BATCH_API, JSON.stringify(newBatch), this.httpOptions).map(data => {
      console.log(data)
      let runningBatch = data as Batch
      this.setCurrentBatchInfo(runningBatch);
    })
  }

  setCurrentBatchInfo(data: Batch) {
    let currentBatch = {
      batch_number: data.batch_number,
      order_number: data.order_number.order_number,
      article_number: data.order_number.article_number,
    }
    this.changeProdStatus(true);
    this.changeProdInfo(currentBatch)
  }

  

  getBatchList(query?:String):Observable<any> {
    return this.http.get(this.URL_ROOT + this.URL_BATCH_API)
  }
  //TODO: These can be the same function
  getBatchDetail(query?: string) {
    return this.http.get(this.URL_ROOT+this.URL_BATCH_API  + query)
  }

  /* PATCH: update the batch on the server.  */
  /* TODO: Create pipe or similar to catch errors */
  updateBatch(updatedBatch: Batch) {
    let UPDATE_BATCH_URL = this.URL_ROOT + this.URL_BATCH_API + updatedBatch.batch_number + "/" // The URL to correct API
    console.log("updating batch! url is: " + UPDATE_BATCH_URL)
    console.log("Data is: ")
    console.log(updatedBatch)
    return this.http.patch(UPDATE_BATCH_URL, JSON.stringify(updatedBatch), this.httpOptions)
  }

  getProductionStatistics(query?:String) {
    return this.http.get(this.scoreboardListURL+query)
  }

  updateProdStats(updatedCell: any) {
    let UPDATE_SCOREBOARD_URL = this.URL_ROOT+this.scoreboardListURL+ updatedCell.time_stamp+'/' // The URL to correct API
    return this.http.patch(UPDATE_SCOREBOARD_URL, JSON.stringify(updatedCell), this.httpOptions)
  }

}
