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
  constructor() {}

  updateIndex(index: number) {
    this.selectedIndex = index;
  }
}
