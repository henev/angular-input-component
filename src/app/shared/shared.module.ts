import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';
import { FormValidatorDirective } from './validators/form-validator.directive';
import { MaxValidatorDirective } from './validators/max-validator.directive';
import { MinValidatorDirective } from './validators/min-validator.directive';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';
import { ValidationMessageComponent } from './validation-messages/validation-message.component';



@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    InputComponent,
    FormValidatorDirective,
    MaxValidatorDirective,
    MinValidatorDirective,
    ValidationMessagesComponent,
    ValidationMessageComponent
  ],
  exports: [
    InputComponent,
    FormValidatorDirective,
    MaxValidatorDirective,
    MinValidatorDirective,
    ValidationMessagesComponent,
    ValidationMessageComponent
  ]
})
export class SharedModule { }
