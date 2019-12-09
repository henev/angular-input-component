import {
  Directive,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[appFormValidator]'
})
export class FormValidatorDirective implements OnInit, OnDestroy {

  @Input() appFormValidator: NgForm;

  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.element.nativeElement.addEventListener('submit', this.onSubmit.bind(this));
  }

  ngOnDestroy() {
    this.element.nativeElement.removeEventListener('submit', this.onSubmit.bind(this));
  }

  private onSubmit(event: any): void {
    if (this.appFormValidator.invalid) {
      return;
    }

    // Emits Angular ngSubmit to reproduce it.
    this.appFormValidator.onSubmit(event);
    // Emits custom submit event to execute submit function.
    this.formSubmit.emit();
  }

}
