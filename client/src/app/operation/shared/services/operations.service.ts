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
  // private prodActive = new BehaviorSubject<boolean>(false);
  // prodActiveObservable = this.prodActive.asObservable();

  //This variable is holding the data values for the current running batch. It is shared between start-batch, finish-batch and current-batch-info.
  //It is modified as an observable make it shareable between the components. 
  private prodInfo = new BehaviorSubject<{}>(null);
  prodInfoObservable = this.prodInfo.asObservable();

  //TODO: Should URLs really be placed here? Should we collect them in a file somewhere? 

  readonly URL_ROOT: string = "http://localhost:8000";
  readonly URL_ORDER_API: string = "/api/operations/order/";
  readonly URL_BATCH_API: string = "/api/operations/batch/";
  readonly URL_PRODUCT_API: string = "/api/operations/product/";

  // Scoreboard URL
  private scoreboardListURL: string = "/api/statistics/";

  // Floorstock URLs
  private floorstockItemsURL: string = "/api/floorstock/item/";
  private floorstockChangesURL: string = "/api/floorstock/changelog/";

  currentBatch: {
    active: boolean,
    shifts: number,
    id: string,
    batch_number: string,
    order: {
      order_number: string,
      article_number: string,
    }
  }

  constructor(private http: HttpClient) { }

  //This method sets the data values for the current running batch.
  changeProdInfo(info: {}) {
    this.prodInfo.next(info);
  }

  getProduct(query?: string) {
    if (query) {
      return this.http.get(this.URL_ROOT + this.URL_PRODUCT_API + query + '/')
    }
    return this.http.get(this.URL_ROOT + this.URL_PRODUCT_API)
  }

  getOrderByBatch(batch) {
    return this.http.get(this.URL_ROOT + this.URL_BATCH_API + batch + '/').switchMap(data => {
      let returnedBatch = data as Batch
      let order_number = returnedBatch.order.order_number
      return this.http.get(this.URL_ROOT + this.URL_ORDER_API)
    })
  }

  getOrder(query?: string) {
    if (query) {
      return this.http.get(this.URL_ROOT + this.URL_ORDER_API + query + '/')
    }
    return this.http.get(this.URL_ROOT + this.URL_ORDER_API)
  }

  createBatch(newBatch: {}) {
    console.log(newBatch)
    return this.http.post(this.URL_ROOT + this.URL_BATCH_API, JSON.stringify(newBatch))
  }

  getBatchList(query?: String): Observable<any> {
    return this.http.get(this.URL_ROOT + this.URL_BATCH_API)
  }
  //TODO: These can be the same function
  getBatchDetail(query?: String): Observable<any> {
    if (query) {
      return this.http.get(this.URL_ROOT + this.URL_BATCH_API + query)
    }
    return this.http.get(this.URL_ROOT + this.URL_BATCH_API)
  }

  setCurrentBatchInfo(data: Batch) {
    if (data) {
      this.currentBatch = {
        active: true,
        shifts: data.shifts,
        id: data.id,
        batch_number: data.batch_number,
        order: {
          order_number: data.order.order_number,
          article_number: data.order.article_number,
        }, 
      }
      this.changeProdInfo(this.currentBatch)
    } else {
      this.changeProdInfo(null)
    }
  }


  /* PATCH: update the batch on the server.  */
  /* TODO: Create pipe or similar to catch errors */
  updateBatch(updatedBatch: Batch) {
    let UPDATE_BATCH_URL = this.URL_ROOT + this.URL_BATCH_API + updatedBatch.id + "/" // The URL to correct API
    console.log("updating batch! url is: " + UPDATE_BATCH_URL)
    console.log("Data is: ")
    console.log(updatedBatch)
    return this.http.patch(UPDATE_BATCH_URL, JSON.stringify(updatedBatch))
  }
  updateOrder(order) {
    console.log("Sending data: ")
    console.log(JSON.stringify(order))
    return this.http.put(this.URL_ROOT + this.URL_ORDER_API + order['order_number'] + '/', JSON.stringify(order))
  }

  getFloorstockItems(query?:string) {
    return this.http.get(this.URL_ROOT + this.floorstockItemsURL)
    
  }

  getFloorstockChanges(query?: string) {
    return this.http.get(this.URL_ROOT + this.floorstockChangesURL + query)
  }

  createFloorstock(newItem: {}) {
    return this.http.post(this.URL_ROOT + this.floorstockChangesURL, JSON.stringify(newItem)).map(data => {
    })
  }

  updateFloorstock(updatedItem: any) {
    let UPDATE_FLOORSTOCK_URL = this.URL_ROOT + this.floorstockChangesURL + updatedItem.id // The URL to correct API
    return this.http.patch(UPDATE_FLOORSTOCK_URL, JSON.stringify(updatedItem))
  }

  getProdStats(query?: string) {
    return this.http.get(this.URL_ROOT + this.scoreboardListURL + query)
  }

  createProdStats(newCell: {}) {
    return this.http.post(this.URL_ROOT + this.scoreboardListURL, JSON.stringify(newCell)).map(data => {
    })
  }

  getProductionStatistics(query?: String) {
    return this.http.get(this.scoreboardListURL + query)
  }

  updateProdStats(updatedCell: any) {
    let UPDATE_SCOREBOARD_URL = this.URL_ROOT + this.scoreboardListURL + updatedCell.time_stamp + '/' // The URL to correct API
    return this.http.patch(UPDATE_SCOREBOARD_URL, JSON.stringify(updatedCell))
  }

}
