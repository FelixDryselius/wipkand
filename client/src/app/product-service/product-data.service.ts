import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


@Injectable()
export class ProductDataService {
  prodData: any [];

  readonly ROOT_URL = 'http://localhost:8000/api/operations/product/'

  constructor(private http: HttpClient) { }

  getProdData() {
  return this.http.get(this.ROOT_URL)
  }
}
