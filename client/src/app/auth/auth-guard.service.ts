import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthAPIService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
      public auth: AuthAPIService,
      public router: Router
    ) { }

  canActivate(): boolean {

    if (!this.auth.loggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}