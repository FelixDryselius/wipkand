import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthAPIService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  authData :any;
  constructor(
    private authAPI: AuthAPIService,
  ) { }

  ngOnInit() {
    let data = {username:"operator", password: "op_password"}
    this.authAPI.login(data).subscribe(data=> {
      this.authData = data
    })
  }
}
