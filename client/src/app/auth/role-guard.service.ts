import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthAPIService } from './auth.service';
import { User } from '../shared/interfaces/user';


//Third party imports
import { Observable } from 'rxjs/Observable';
import { tap, map, take } from 'rxjs/operators'

@Injectable()
export class RoleGuard implements CanActivate {
    user: User;
    constructor(
        public authAPI: AuthAPIService,
        public router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const expectedRole = route.data.expectedRole;
        const user = this.authAPI.currentUser
        return this.authAPI.$currentUser.pipe(
            take(1),
            map(user => {
                if (user) {
                    if ((user.isAdmin == true) ||
                        (user.isSupervisor && expectedRole.includes('supervisor')) ||
                        (user.isOperator && expectedRole.includes('operator'))
                    ) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            }),
            tap(isAuthorized => {
                if (!isAuthorized) {
                    console.error("Access denied. You have no permission")
                    this.router.navigate(['']);
                }
            })
        )
    }

}