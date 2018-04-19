import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Application pipe:
import { SortByPipe } from './sort-by.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SortByPipe
  ], 
  exports: [SortByPipe]
})
export class ApplicationPipeModule { }
