import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavInformationServiceService {

  private currentBatchSource = new BehaviorSubject<any>(null);
  currentBatchObservable = this.currentBatchSource.asObservable();

  constructor() { }

  changeBatchInfo(obj:any){
    this.currentBatchSource.next(obj)
  }
}
