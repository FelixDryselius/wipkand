import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'

import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import { TokenInterceptor } from './auth/token.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { HomeComponent } from './home/home.component';

import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { FloorstockComponent } from './floorstock/floorstock.component';
import { ShiftChangeComponent } from './shift-change/shift-change.component';
import { BatchHistoryComponent } from './batch-history/batch-history.component';

import { BatchReworkComponent } from './batch-rework/batch-rework.component';


import { OperationsService } from './operation/shared/services/operations.service';
import { AuthComponent } from './auth/auth.component';
import { AuthAPIService } from './auth/auth.service';


//Third party imports:
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { CookieService } from 'ngx-cookie-service';
import { OperationModule } from './operation/operation.module';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';


@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,

    ScoreboardComponent,
    FloorstockComponent,
    ShiftChangeComponent,
    BatchHistoryComponent,
   
    BatchReworkComponent,


    AuthComponent,
    AuthLogoutComponent


  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    Ng2PageScrollModule,
    OperationModule
  ],
  providers: [AuthAPIService,
    OperationsService, 
    // CookieService,
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: TokenInterceptor,
    //     multi: true
    // }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

