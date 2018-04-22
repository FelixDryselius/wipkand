import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthAPIService } from './auth.service';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthLoginData } from './auth'
import { User } from './user'

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  userData: User;
  loginForm: FormGroup;
  usernameField: FormControl;
  passwordField: FormControl;
  constructor(
    private authAPI: AuthAPIService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.usernameField = new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
    this.passwordField = new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
    this.loginForm = new FormGroup({
      'usernameField': this.usernameField,
      'passwordField': this.passwordField
    })
  }

  doLogin(data) {
    this.authAPI.login(data).subscribe(data => {
      this.userData = data as User
      let token = {
        accessToken: this.userData.access || null,
        refreshToken: this.userData.refresh || null,
        expiry: new Date(this.userData.expires) || null
      } 
      this.authAPI.performLogin(token)
      console.log("Login Success!")
    })
  }

  handleSubmit(event: any, ourLoginDir: NgForm, loginFormGroup: FormGroup) {
    event.preventDefault()
    if (ourLoginDir.submitted) {
      console.log(loginFormGroup.value)
      let authLoginData = new AuthLoginData(
        loginFormGroup.value['usernameField'],
        loginFormGroup.value['passwordField'],
      )
      console.log(authLoginData)
      this.doLogin(authLoginData);
      ourLoginDir.resetForm({})

    }
  }
}
