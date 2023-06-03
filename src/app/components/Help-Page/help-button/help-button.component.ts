import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';

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
  constructor(private dialog: MatDialog) {}
  onHelpClick() {
    console.log('on help clicked');
    this.dialog.open(HelpDialogComponent, { width: '100%', height: '80%' });
  }
}
