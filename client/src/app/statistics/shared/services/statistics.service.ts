import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

// 3rd party imports:
import { Observable } from 'rxjs/Observable';
import { timestamp } from 'rxjs/operators';


@Injectable()
export class StatisticsService {

  
  readonly ROUTE_URL_GET_STATISTICS = 'http://localhost:8000/api/statistics/' // hard coded URL for api to get statistics

  constructor(private http:HttpClient) { }

  // the method other apps subscribe to in order to get the api
  getStatistics(batchNumber:String) {
    return this.http.get(this.ROUTE_URL_GET_STATISTICS) //should add a catch error func here, like: import "rxjs/add/operator/catch";
  }
}