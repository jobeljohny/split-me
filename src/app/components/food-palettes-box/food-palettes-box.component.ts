import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodItem } from 'src/app/classes/food-item';
import { FoodPaletteService } from 'src/app/services/food-palette.service';
import { KeyBindingService } from 'src/app/services/keybinding.service';
import { ImportModalComponent } from '../import-modal/import-modal.component';
import { HelpDialogComponent } from '../Help-Page/help-dialog/help-dialog.component';
import { pages } from '../Help-Page/help-dialog/help-page-utils';
@Component({
  selector: 'app-food-palettes-box',
  templateUrl: './food-palettes-box.component.html',
  styleUrls: ['./food-palettes-box.component.scss'],
})
export class FoodPalettesBoxComponent {
  @ViewChild('itemWrapper') myScrollContainer!: ElementRef;

  constructor(
    private foodPalette: FoodPaletteService,
    private keyBinding: KeyBindingService,
    private dialog: MatDialog
  ) {
    this.keyBinding.handleAltF(this.onAddFoodPalette.bind(this));
    //TODO remove
    setTimeout(() => {
      this.onImportBill();
    }, 200);
  }

  onAddFoodPalette() {
    this.foodPalette.add();

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
      panelClass: 'importModal',
      width:'520px',
    });
  }

  removeFoodTile(item: FoodItem) {
    this.foodPalette.remove(item);
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
