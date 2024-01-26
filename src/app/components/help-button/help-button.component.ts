import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KeyBindingService } from 'src/app/services/keybinding.service';
import { HelpDialogComponent } from 'src/app/help-dialog/help-dialog/help-dialog.component';
import { pages } from 'src/app/help-dialog/help-dialog/help-page-utils';

@Component({
  selector: 'app-help-button',
  template: ` <button class="help-button" (click)="onHelpClick()">?</button> `,
  styles: [
    `
      .help-button {
        background: #4945ff;
        color: white;
        border: 0;
        width: 25px;
        height: 25px;
        border-radius: 25px;
        opacity: 0.9;
        &:hover {
          opacity: 1;
        }
      }
    `,
  ],
})
export class HelpButtonComponent {
  constructor(
    private dialog: MatDialog,
    private keyBinding: KeyBindingService
  ) {
    this.keyBinding.handleAltH(this.onHelpClick.bind(this));
  }

  onHelpClick() {
    this.dialog.open(HelpDialogComponent, {
      width: '1200px',
      height: '600px',
      data: { page: pages.About },
    });
  }
}
