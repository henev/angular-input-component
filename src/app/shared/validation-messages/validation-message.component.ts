import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-validation-message',
  template: '<div class="validation-message" *ngIf="show"><ng-content></ng-content></div>',
  styleUrls: ['./validation-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessageComponent {
  private _show = false;

  @Input() name: string;

  set show (value) {
    this._show = value;
    this.changeDetectorRef.markForCheck();
  }
  get show() {
    return this._show;
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  showsErrorIncludedIn(errors: string[]): boolean {
    return errors.some(error => error === this.name);
  }
}
