import { debounceTime } from 'rxjs/operators';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
  DoCheck,
  forwardRef,
  OnDestroy,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  NgModel,
  NgForm,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements DoCheck, ControlValueAccessor, OnDestroy {
  // !IMPORTANT - KEEP VALIDATOR INPUTS WITH THE SAME NAME AS THE VALIDATOR ITSELF
  // SO THAT FORM CONTROL CAN BE VALIDATED THE SAME WAY AS NG FORM

  // General
  @Input() containerClass: string;
  @Input() disabled: boolean;
  @Input() form: NgForm;
  @Input() inputClass: string;
  @Input() infoText: string;
  @Input() labelText: string;
  @Input() labelClass: string;
  @Input() labelInfo: string;
  @Input() labelInfoPlacement = 'top';
  @Input() listFormatter: Function;
  @Input() name: string;
  @Input() type: string;
  @Input() readonly: boolean;
  @Input() required: boolean;

  // Number
  @Input() appMinValidator: number;
  @Input() appMaxValidator: number;

  // Select
  @Input() selectOptions: any[];
  @Input() optionLabelKey: string;
  @Input() optionValueKey: string;

  // Textarea
  @Input() rows: number;

  /** Used to delay fast input change emits. Usually when making requests to BE on change */
  @Input() debounce = false;

  @Output() inputChange: EventEmitter<any> = new EventEmitter();

  // Update the variable upon changes in order to avoid errors with *ngIf.
  // https://stackoverflow.com/questions/44028873/access-local-variable-within-ngif
  @ViewChild('input', {static: false}) set setInput(e: NgModel) {
    this.input = e;

    if (this.debounce) {
      this.valueSub = this.input.valueChanges.pipe(
        debounceTime(300))
        .subscribe(() => {
          // Prevent emitting event on initilizing the inputs
          if (!this.hasChangedProgrammatically) {
            this.inputChange.emit(this.value);
            this.hasChangedProgrammatically = true;
          }
        });
    }

    this.cdr.detectChanges();
  }
  @ViewChild('input', { read: ElementRef, static: false }) inputElement: ElementRef;

  // The internal data model
  private _value: string | number;
  private valueSub: Subscription;

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;

  // Get accessor for the model
  get value(): any {
    return this._value;
  }

  // Set accessor including call the onchange callback
  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.onChangeCallback(value);
    }
  }

  // Variable bound to the ng model of the input
  // #input
  input: NgModel;
  isInvalid = false;
  isFocused = false;

  // Used with debounce and onValueChanges to protect from emitting events for programmatically changes
  // onChanges is called on non-programmatically changes so it will allow valueChanges to execute emit event with debounce
  // by setting this variable to false and then it will be reset to true after event is emitted
  hasChangedProgrammatically = true;

  // Used to determine from where the animation for the bottom line of the input should start
  bottomLineTransformOrigin = '0px';

  constructor(private cdr: ChangeDetectorRef) { }

  ngDoCheck() {
    this.checkInputValidity();
  }

  ngOnDestroy() {
    if (this.valueSub) {
      this.valueSub.unsubscribe();
    }
  }

  // Implementing interface for ControlValueAccessor so that the parent
  // form recognize the children inputs inside the component
  // http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel
  // https://github.com/angular/angular/issues/11360#issuecomment-245374669
  writeValue(value: any): void {
    if (value !== this._value) {
      this._value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
    this.isFocused = false;
  }

  onFocus() {
    this.checkInputValidity();
    this.isFocused = true;
  }

  onClick(event) {
    this.bottomLineTransformOrigin = `${event.offsetX}px`;
  }

  onChange(value) {
    this.hasChangedProgrammatically = false;

    if (!this.debounce) {
      this.inputChange.emit(value);
    }
  }

  private checkInputValidity() {
    const isInputFocused = this.inputElement && document.activeElement === this.inputElement.nativeElement;
    const isFormSubmitted = this.form && this.form.submitted;

    this.isInvalid = this.input && this.input.invalid && !isInputFocused && (this.input.touched || isFormSubmitted);
    this.cdr.markForCheck();
  }

}
