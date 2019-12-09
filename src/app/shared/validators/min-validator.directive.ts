import { Directive, Input, forwardRef } from '@angular/core';
import { Validator, ValidatorFn, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appMinValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinValidatorDirective),
    multi: true
  }]
})
export class MinValidatorDirective implements Validator {

  @Input() appMinValidator: string;

  validate(control: AbstractControl): {[key: string]: any} {
    if (!this.appMinValidator) {
      return null;
    }

    const parsedValue = parseInt(this.appMinValidator, 10);

    return !isNaN(parsedValue) ? this.isValid(this.appMinValidator)(control) : null;
  }

  private isValid(minValue: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const validation = isNaN(control.value) || control.value < minValue;

      return validation ? { appMinValidator: { value: control.value } } : null;
    };
  }

}
