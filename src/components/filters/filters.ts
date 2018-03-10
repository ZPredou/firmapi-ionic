import { Component } from '@angular/core';

@Component({
  selector: 'filters',
  templateUrl: 'filters.html'
})
export class FiltersComponent {

  text: string;
  nbcompany: string;

  constructor() {
    console.log('Hello FiltersComponent Component');
    this.text = 'Hello World';
    this.nbcompany ='156165156';
  }

}
