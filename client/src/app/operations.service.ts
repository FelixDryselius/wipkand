import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

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
      //'Authorization': ''
    })
  }
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
    return this.http.post(this.ROOT_URL + this.orderCREATE_URL, JSON.stringify(newOrder), this.httpOptions);
  }

  createBatch(newBatch: {}) {
    console.log("POST - Create new batch")
    return this.http.post(this.ROOT_URL + this.batchCREATE_URL, JSON.stringify(newBatch), this.httpOptions);
  }

  getActiveBatch() {
    return this.http.get(this.ROOT_URL + this.batchGET_URL)
  }
}
