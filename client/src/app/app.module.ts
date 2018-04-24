import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import { TokenInterceptor } from './auth/token.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { FloorstockComponent } from './floorstock/floorstock.component';
import { ShiftChangeComponent } from './shift-change/shift-change.component';
import { BatchHistoryComponent } from './batch-history/batch-history.component';
import { BatchReworkComponent } from './batch-rework/batch-rework.component';
import { OperationsService } from './operation/shared/services/operations.service';
import { AuthComponent } from './auth/auth.component';
import { AuthAPIService } from './auth/auth.service';


//Third party imports:
import { CookieService } from 'ngx-cookie-service';
import { OperationModule } from './operation/operation.module';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { BatchHistoryDetailComponent } from './batch-history-detail/batch-history-detail.component';
import { StatisticsModule } from './statistics/statistics.module';



@NgModule({
  declarations: [
    AppComponent,


    BatchReworkComponent,
    AuthComponent,
    AuthLogoutComponent,
    BatchHistoryDetailComponent,
    BatchHistoryComponent,
    FloorstockComponent,
    ShiftChangeComponent

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    OperationModule,
    StatisticsModule
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

