import { Component } from '@angular/core';
import { pages as Page } from './help-page-utils';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
})
export class HelpDialogComponent {
  currentDisplay: string = 'About';
  pages: Page[] = Object.values(Page);

  showPage(page: Page): void {
    this.currentDisplay = page;
  }

  get Pages() {
    return Page;
  }
}
