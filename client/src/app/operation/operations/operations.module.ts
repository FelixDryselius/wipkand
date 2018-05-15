import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';


//3rd party and application imports:
import { OperationsComponent } from './operations.component';
import { OperationsRoutingModule } from './operations-routing.module';


@NgModule({
  imports: [
    CommonModule,
    OperationsRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    OperationsComponent
  ],
  bootstrap: []
})
export class OperationsModule { }
