import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  user = {
    fName: '',
    lName: '',
    age: '',
    gender: null
  };
  genders = [
    {id: 1, name: 'Male'}, 
    {id: 2, name: 'Female'}
  ];

  submit() {
    alert('Form submitted!');
  }
}
