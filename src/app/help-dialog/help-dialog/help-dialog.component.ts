import { Component, Inject } from '@angular/core';
import { pages } from './help-page-utils';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPageData } from 'src/app/classes/interfaces';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
})
export class HelpDialogComponent {
  currentDisplay: pages = pages.About;
  constructor(@Inject(MAT_DIALOG_DATA) public data: IPageData) {
    this.currentDisplay = data.page;
  }

  showPage(page: pages): void {
    this.currentDisplay = page;
  }

  get Pages() {
    return pages;
  }
}
