# Angular Input Component

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-oenpgt)

One of the first things I do when I work on big Angular project is to create my components, directives and styles for inputs and forms.

Usually a big project means a lot of forms with a lot of inputs. Inputs usually have the same design and same architecture of label, input and error messages. To save some space and time it is good practice to extract this common logic and archiecture, making your .html and .ts files way smaller and much more readable.

In this repo I am showing how I am extracting the basic inputs that almost any project has like text (text, email, password), number, select and textarea. So instead of defining on every input container, label, input, error messages + all the attributes and classes and end up with something like this **(and even more)**

```html
<div class="input-container">
  <label for="name" class="input-label">Name</label>

  <input 
    id="name" 
    class="input" 
    name="name"
    type="text"
    [(ngModel)]="user.name"
    required />

  <app-validation-messages [for]="input" [hidden]="!isInvalid">
    <app-validation-message name="required">This field is required</app-validation-message>
  </app-validation-messages>
</div>
```

you get a small consistent definitions of your inputs that include it all **(and even more)**

```html
<app-input
  name="name"
  type="text"
  labelText="Name"
  [form]="exampleForm"
  [(ngModel)]="user.name"
  [required]="true">
</app-input>
```

In this repo are included also some other good to have things like **custom validations**, components for the **validation messages** and a **form validation** that will not submit the form if it is invalid.

The input component is easy to modify to add other types of inputs like, datepickers, autocompletes, etc.

*I also included in the project some Angular material kind of styling for the components made from scratch, so feel free to explore and modify :)*
