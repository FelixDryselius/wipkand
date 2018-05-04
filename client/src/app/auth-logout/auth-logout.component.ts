import { Component, OnInit } from '@angular/core';
import { AuthAPIService } from '../auth/auth.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrls: ['./auth-logout.component.css']
})
export class AuthLogoutComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private authAPI: AuthAPIService
  ) { }

  ngOnInit() {
    this.authAPI.performLogout()
  }

}
