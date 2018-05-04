import { Component } from '@angular/core';

// Application imports:
import { AuthAPIService } from './auth/auth.service';
import { CurrentBatchInfoModule } from './operation/current-batch-info/current-batch-info.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private loggedIn: boolean;
  constructor(
    private authAPI: AuthAPIService
  ) {
    this.authAPI.loggedIn$.subscribe(loggedIn => this.loggedIn = loggedIn)
  }
  logout() {
    this.authAPI.performLogout()
  }
}