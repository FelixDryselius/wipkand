import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthAPIService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrentBatchInfoComponent } from './current-batch-info/current-batch-info.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { OperationModule } from './operation/operation.module';
import { OperationsService } from './shared/application-services/operations.service';
import { RoleGuard } from './auth/role-guard.service';
import { CalendarModule } from 'primeng/calendar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

//Third party imports:
import { CookieService } from 'ngx-cookie-service';
import { NotFoundComponent } from './not-found/not-found.component';
import { SubmitIfValidDirective } from './shared/directives/submit-if-valid.directive';
import { CommentService } from './shared/application-services/comment.service';
import { HomeComponent } from './home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuthLogoutComponent,
    CurrentBatchInfoComponent,
    NotFoundComponent,
    SubmitIfValidDirective,
    HomeComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgxChartsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    AuthAPIService,
    CommentService,
    OperationsService,
    CookieService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

