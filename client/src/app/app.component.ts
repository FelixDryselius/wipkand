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
  public isCollapsed = true;
  constructor(
    public authAPI: AuthAPIService
  ) { }

  ngOnInit() {
  }
  
  
}