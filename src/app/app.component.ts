import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  user = {
    firstName: '',
    lastName: '',
    age: '',
    gender: 1
  };
  genders = [{id: 1, name: 'Male'}, {id: 2, name: 'Female'}];

  submit() {
    alert('Form submitted!');
  }
}
