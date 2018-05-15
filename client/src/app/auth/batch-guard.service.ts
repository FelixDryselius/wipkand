import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { OperationsService } from '../operation/shared/services/operations.service';

@Injectable()
export class BatchGuard implements CanActivate {

  constructor(
      public operationsService: OperationsService,
      public router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route
    debugger;
    return true
  }
}