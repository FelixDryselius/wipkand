import { Directive, Input, Output, HostListener } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { EventEmitter } from 'events';

@Directive({
  selector: '[SubmitIfValid]'
})
export class SubmitIfValidDirective {

  //@Input('SubmitIfValid') formRef: FormGroup;
  @Output() valid = new EventEmitter(); 
  constructor(private formRef: NgForm) { }

  @HostListener('click')
  handleClick() {
    this.markFieldAsDirty();
    this.emitIfValid();
  }

  private markFieldAsDirty() {
    Object.keys(this.formRef.controls)
      .forEach(fieldName => this.formRef.controls[fieldName].markAsDirty()
    ); 
  }

  private emitIfValid() {
    if (this.formRef.valid) {
      this.valid.emit(null);
    }
  }
}
