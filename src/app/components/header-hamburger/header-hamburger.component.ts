import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../Help-Page/help-dialog/help-dialog.component';

@Component({
  selector: 'app-header-hamburger',
  templateUrl: './header-hamburger.component.html',
  styleUrls: ['./header-hamburger.component.scss'],
})
export class HeaderHamburgerComponent {
  constructor(private dialog: MatDialog) {}

  onHelp() {
    this.dialog.open(HelpDialogComponent, { width: '100%', height: '80%' });
  }
}
