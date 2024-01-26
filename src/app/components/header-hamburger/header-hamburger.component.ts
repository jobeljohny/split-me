import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from 'src/app/help-dialog/help-dialog/help-dialog.component';
import { pages } from 'src/app/help-dialog/help-dialog/help-page-utils';

@Component({
  selector: 'app-header-hamburger',
  templateUrl: './header-hamburger.component.html',
  styleUrls: ['./header-hamburger.component.scss'],
})
export class HeaderHamburgerComponent {
  constructor(private dialog: MatDialog) {}

  onHelp() {
    this.dialog.open(HelpDialogComponent, {
      width: '1200px',
      height: '600px',
      data: { page: pages.About },
    });
  }
}
