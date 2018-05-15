import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { OperationsService } from '../operation/shared/services/operations.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { QueryResponse } from '../shared/interfaces/query-response';
@Injectable()
export class BatchGuard implements CanActivate {

    constructor(
        public operationsService: OperationsService,
        public router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const url = route.url.join('');
        return this.operationsService.$batchActive.pipe(
            take(1),
            map(batch => {
                if (url == 'finish-batch' && (batch as QueryResponse).count > 0) {
                    return true
                } else if (url == 'start-batch' && (batch as QueryResponse).count == 0) {
                    return true
                } else {
                    console.error("Access denied. Url cannot be navigated to at current batch status.")
                    this.router.navigate(['']);
                    return false
                }
            })
        )
    }
}