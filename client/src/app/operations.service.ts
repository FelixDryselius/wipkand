import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

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

  constructor() { }

  //This method changes the status of a batch running or a batch not running.
  changeProdStatus(active: boolean) {
    this.prodActive.next(active);
  }

  //This method sets the data values for the current running batch.
  changeProdInfo(info: {}){
    this.prodInfo.next(info)
  }
}
