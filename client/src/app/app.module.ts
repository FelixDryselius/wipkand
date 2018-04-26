import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthAPIService } from './auth/auth.service';
import { AuthComponent } from './auth/auth.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { BatchHistoryDetailComponent } from './batch-history-detail/batch-history-detail.component';
import { BatchHistoryComponent } from './batch-history/batch-history.component';
import { BatchReworkComponent } from './batch-rework/batch-rework.component';
import { BrowserModule } from '@angular/platform-browser';
//import { TokenInterceptor } from './auth/token.interceptor';
import { OperationModule } from './operation/operation.module';
import { OperationsService } from './operation/shared/services/operations.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

//Third party imports:
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    BatchReworkComponent,
    AuthComponent,
    AuthLogoutComponent,
    BatchHistoryDetailComponent,
    BatchHistoryComponent,
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    OperationModule,
   AppRoutingModule
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

