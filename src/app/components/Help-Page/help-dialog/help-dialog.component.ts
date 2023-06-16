import { Component } from '@angular/core';
import { pages } from './help-page-utils';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
})
export class HelpDialogComponent {
  currentDisplay: string = 'About';

  showPage(page: pages): void {
    this.currentDisplay = page;
  }

  get Pages() {
    return pages;
  }
}
