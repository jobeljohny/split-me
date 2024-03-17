import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DOMAIN_NAME } from './classes/constants';
import { WebsiteMovedDialogComponent } from './components/website-moved-dialog/website-moved-dialog.component';
import { FoodPaletteService } from './services/food-palette.service';
import { KeyBindingService } from './services/keybinding.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'split-me';

  constructor(
    private keyBinding: KeyBindingService,
    private foodPaletteService: FoodPaletteService,
    private dialog: MatDialog,

    @Inject(DOCUMENT) private document: Document
  ) {
    //  this.checkHostName();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.keyBinding.keydown(event);
  }
  @HostListener('window:beforeunload', ['$event'])
  canDeactivate(): boolean {
    //TODO remove
    return true;
    return this.foodPaletteService.palettes.length == 0;
  }

  checkHostName() {
    if (!this.document.location.hostname.includes(DOMAIN_NAME)) {
      this.dialog.open(WebsiteMovedDialogComponent, {
        width: '400px',
        height: '350px',
        panelClass: 'split-me-modal',
      });
    }
  }
}
