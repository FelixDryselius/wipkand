import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthAPIService } from './auth.service';
import { User } from '../shared/interfaces/user';

@Injectable()
export class RoleGuard implements CanActivate {
    user: User;
    getUserRoleSub: any;
    constructor(
        public authAPI: AuthAPIService,
        public router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const expectedRole = route.data.expectedRole;
        const user = this.authAPI.currentUser

        if (user) {
            if ((user.isAdmin == true) ||
                (user.isSupervisor && expectedRole.includes('supervisor')) ||
                (user.isOperator && expectedRole.includes('operator'))
            ) {
                return true
            } else {
                console.log("User has no role priviliges for VFAL Monitor... Logging out");
                this.authAPI.performLogout()
                return false
            }
        } else {
            return false
        }
    }

}