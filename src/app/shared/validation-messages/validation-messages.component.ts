import {
  Component,
  OnDestroy,
  Input,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ValidationMessageComponent } from './validation-message.component';

@Component({
  selector: 'app-validation-messages',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessagesComponent implements OnDestroy {
  @Input()
  set for(val: FormControl) {
    this._for = val;

    // If value is present and there is no subscribtion yet
    if (val && !this.statusChangesSubscription) {

      // Subscribe to the events when validation is recalculated for the input
      this.statusChangesSubscription = this.for.statusChanges.subscribe(x => {
        this.messageComponents.forEach(messageComponent => messageComponent.show = false);

        if (this.for.invalid && this.for.errors) {
          const firstErrorMessageComponent = this.messageComponents.find(messageComponent => {
            return messageComponent.showsErrorIncludedIn(Object.keys(this.for.errors));
          });

          if (firstErrorMessageComponent) {
            firstErrorMessageComponent.show = true;
          }
        }
      });
    }
  }
  get for () {
    return this._for;
  }

  @ContentChildren(ValidationMessageComponent) messageComponents: QueryList<ValidationMessageComponent>;

  private statusChangesSubscription: Subscription;
  private _for: FormControl;

  ngOnDestroy() {
    this.statusChangesSubscription.unsubscribe();
  }
}
