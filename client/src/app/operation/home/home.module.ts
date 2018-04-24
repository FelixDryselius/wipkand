import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';


//3rd party and application imports:
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [
    HomeComponent
  ],
  bootstrap: []
})
export class HomeModule { }
