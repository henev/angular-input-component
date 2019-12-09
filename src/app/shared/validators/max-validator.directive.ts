import { Directive, Input, forwardRef } from '@angular/core';
import { Validator, ValidatorFn, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appMaxValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MaxValidatorDirective),
    multi: true
  }]
})
export class MaxValidatorDirective implements Validator {

  @Input() appMaxValidator: string;

  validate(control: AbstractControl): {[key: string]: any} {
    if (!this.appMaxValidator) {
      return null;
    }

    const parsedValue = parseInt(this.appMaxValidator, 10);

    return !isNaN(parsedValue) ? this.isValid(this.appMaxValidator)(control) : null;
  }

  private isValid(maxValue: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const validation = isNaN(control.value) || control.value > maxValue;

      return validation ? { appMaxValidator: { value: control.value } } : null;
    };
  }

}
