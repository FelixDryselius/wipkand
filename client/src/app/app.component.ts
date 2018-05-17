import { Component, OnInit } from '@angular/core';

// Application imports:
import { AuthAPIService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  error: string;
  showError: boolean;
  constructor(
    private authAPI: AuthAPIService
  ) { }

  ngOnInit() {
    this.authAPI
      .errorNotification$
      .subscribe(message => {
        this.error = message;
        this.showError = true;
      });
  }
  
  
}