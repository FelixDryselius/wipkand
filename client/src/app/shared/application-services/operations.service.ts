import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { catchError, retry, take } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { timeout } from 'rxjs/operators/timeout';
import { Batch } from '../../shared/interfaces/batch';
import { QueryResponse } from '../../shared/interfaces/query-response';
import { AuthAPIService } from '../../auth/auth.service';
import { map } from 'rxjs/operator/map';



@Injectable()
export class OperationsService {
  //TODO: prodActive is now false by default (on page refresh etc.). Should get its value from the DB instead. Same with prodInfo

  //This variable is determining if a batch is currently running. It is shared between start-batch, finish-batch and current-batch-info.
  //It is modified as an observable make it shareable between the components. 
  // private prodActive = new BehaviorSubject<boolean>(false);
  // prodActiveObservable = this.prodActive.asObservable();

  //This variable is holding the data values for the current running batch. It is shared between start-batch, finish-batch and current-batch-info.
  //It is modified as an observable make it shareable between the components. 
  prodInfo = new BehaviorSubject<Batch>(null);
  $prodInfo = this.prodInfo.asObservable()

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

  $batchActive: Observable<QueryResponse>

  constructor(private http: HttpClient, private authAPI: AuthAPIService) { 
    this.setActiveBatchCheck()
  }

  setActiveBatchCheck() {
    this.$batchActive = this.getBatch("?batch_number=activeBatch")
      .switchMap(data => {
        if (data) {
          return Observable.of(data)
        } else {
          return Observable.of(null)
        }
      })
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
  }

  setCurrentBatchInfo(data: Batch) {
    if (data) {
      this.prodInfo.next(data)
    } else {
      this.prodInfo.next(null)
    }
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
    return this.http.post(this.URL_ROOT + this.URL_BATCH_API, JSON.stringify(newBatch))
  }

  //TODO: These can be the same function
  getBatch(query?: String): Observable<any> {
    if (query) {
      return this.http.get(this.URL_ROOT + this.URL_BATCH_API + query)
    }
    return this.http.get(this.URL_ROOT + this.URL_BATCH_API)
  }

  /* PATCH: update the batch on the server.  */
  /* TODO: Create pipe or similar to catch errors */
  updateBatch(updatedBatch: Batch) {
    let UPDATE_BATCH_URL = this.URL_ROOT + this.URL_BATCH_API + updatedBatch.id + "/" // The URL to correct API
    return this.http.patch(UPDATE_BATCH_URL, JSON.stringify(updatedBatch))
  }

  updateOrder(order) {
    return this.http.put(this.URL_ROOT + this.URL_ORDER_API + order['order_number'] + '/', JSON.stringify(order))
  }

  getFloorstockItems(query?: string) {
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

  createProdStats(newData: {}) {
    return this.http.post(this.URL_ROOT + this.scoreboardListURL, JSON.stringify(newData))
  }

  getProductionStatistics(query?: String) {
    if (query) {
      return this.http.get(this.scoreboardListURL + query)
    } else {
      return this.http.get(this.scoreboardListURL)
    }
  }

  updateProdStats(updatedCell: any) {
    let UPDATE_SCOREBOARD_URL = this.URL_ROOT + this.scoreboardListURL + updatedCell.time_stamp + '/' // The URL to correct API
    return this.http.patch(UPDATE_SCOREBOARD_URL, JSON.stringify(updatedCell))
  }

  getQueryPage(query: string): Observable<any>  {
    return this.http.get(query)
  }

}
