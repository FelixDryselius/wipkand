import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class OperationsService {
    //TODO: prodActive is now false by default (on page refresh etc.). Should get its value from the DB instead. Same with prodInfo
    private prodActive = new BehaviorSubject<boolean>(false);
    prodActiveObservable = this.prodActive.asObservable();

    private prodInfo = new BehaviorSubject<{}>(null);
    prodInfoObservable = this.prodInfo.asObservable();

  constructor() { }

  changeProdStatus(active: boolean) {
    this.prodActive.next(active);
  }

  changeProdInfo(info: {}){
    this.prodInfo.next(info)
  }
}
