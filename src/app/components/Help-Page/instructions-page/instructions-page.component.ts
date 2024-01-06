import { Component } from '@angular/core';

@Component({
  selector: 'app-instructions-page',
  templateUrl: './instructions-page.component.html',
  styleUrls: ['./instructions-page.component.scss'],
})
export class InstructionsPageComponent {
  selectedItem: string = '';
  radioButtons: number[] = [1, 2, 3, 4, 5];
  selectedIndex: number = 0;
  constructor() {
    //  setInterval(()=>console.log(this.selectedItem),500)
  }

  onRadioButtonChanged(index: number) {
    this.selectedIndex = index;
  }
  onButtonClick(index: number) {
    this.selectedIndex = index;
  }
}
