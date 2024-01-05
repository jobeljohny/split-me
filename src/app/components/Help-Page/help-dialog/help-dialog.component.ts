import { Component } from '@angular/core';
import { pages } from './help-page-utils';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
})
export class HelpDialogComponent {
  //TODO switch to About
  currentDisplay: pages = pages.Help;

  showPage(page: pages): void {
    this.currentDisplay = page;
  }

  get Pages() {
    return pages;
  }
}
