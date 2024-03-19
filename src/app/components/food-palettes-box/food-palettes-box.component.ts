import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { buttonAnimation, cardAnimation } from 'src/app/classes/animations';
import { FoodItem } from 'src/app/classes/food-item';
import { IBillEntry } from 'src/app/classes/interfaces';
import { HelpDialogComponent } from 'src/app/help-dialog/help-dialog/help-dialog.component';
import { pages } from 'src/app/help-dialog/help-dialog/help-page-utils';
import { FoodPaletteService } from 'src/app/services/food-palette.service';
import { KeyBindingService } from 'src/app/services/keybinding.service';
import { ImportModalComponent } from '../import-modal/import-modal.component';
import { StoreService } from 'src/app/services/store.service';
import { ActionType } from 'src/app/classes/constants';
@Component({
  selector: 'app-food-palettes-box',
  templateUrl: './food-palettes-box.component.html',
  styleUrls: ['./food-palettes-box.component.scss'],
  animations: [cardAnimation, buttonAnimation],
})
export class FoodPalettesBoxComponent {
  @ViewChild('itemWrapper') myScrollContainer!: ElementRef;

  constructor(
    private foodPalette: FoodPaletteService,
    private keyBinding: KeyBindingService,
    private dialog: MatDialog,
    private store: StoreService
  ) {
    this.keyBinding.handleAltF(this.onAddFoodPalette.bind(this));
  }

  onAddFoodPalette() {
    const id = this.foodPalette.add();
    this.store.fireAction(ActionType.ADD_PALETTE, { id: id });

    //TODO create a smoother transition for this or discard scroll effect
    setTimeout(
      () =>
        (this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer?.nativeElement.scrollHeight),
      50
    );
  }

  onImportBill() {
    let dialogRef = this.dialog.open(ImportModalComponent, {
      panelClass: 'split-me-modal',
      width: '520px',
    });
    dialogRef.afterClosed().subscribe((result: IBillEntry[]) => {
      if (result && result.length > 0) {
        result.forEach((palette) => {
          const id = this.foodPalette.add(
            new FoodItem(palette.item, palette.amount, [])
          );
        });
        this.store.fireAction(ActionType.SCAN_RECEIPT_ACTION, {
          palettes: this.foodPalette.palettes,
        });
      }
    });
  }

  removeFoodTile(item: FoodItem) {
    this.foodPalette.remove(item);
    this.store.fireAction(ActionType.REMOVE_PALETTE, { id: item.id });
  }

  openDialog() {
    this.dialog.open(HelpDialogComponent, {
      width: '1200px',
      height: '600px',
      data: { page: pages.Help },
    });
  }

  get palettes() {
    return this.foodPalette.palettes;
  }

  get ids() {
    return this.foodPalette.paletteIDs;
  }
}
