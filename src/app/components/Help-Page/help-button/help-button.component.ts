import { Component } from '@angular/core';

@Component({
  selector: 'app-help-button',
  template: ` <button class="help-button" (click)="onHelpClick()">?</button> `,
  styles: [
    `
      .help-button {
        position: fixed;
        top: 16px;
        right: 16px;
      }
    `,
  ],
})
export class HelpButtonComponent {
  onHelpClick() {}
}
