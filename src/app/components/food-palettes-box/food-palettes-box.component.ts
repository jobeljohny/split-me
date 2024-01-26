import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { buttonAnimation, cardAnimation } from 'src/app/classes/animations';
import { FoodItem } from 'src/app/classes/food-item';
import { IBillEntry } from 'src/app/classes/interfaces';
import { FoodPaletteService } from 'src/app/services/food-palette.service';
import { KeyBindingService } from 'src/app/services/keybinding.service';
import { ImportModalComponent } from '../import-modal/import-modal.component';
import { HelpDialogComponent } from 'src/app/help-dialog/help-dialog/help-dialog.component';
import { pages } from 'src/app/help-dialog/help-dialog/help-page-utils';
@Component({
  selector: 'app-food-palettes-box',
  templateUrl: './food-palettes-box.component.html',
  styleUrls: ['./food-palettes-box.component.scss'],
  animations: [cardAnimation, buttonAnimation],
})
export class FoodPalettesBoxComponent {
  buttonState: number = 0;
  @ViewChild('itemWrapper') myScrollContainer!: ElementRef;

  constructor(
    private foodPalette: FoodPaletteService,
    private keyBinding: KeyBindingService,
    private dialog: MatDialog
  ) {
    this.keyBinding.handleAltF(this.onAddFoodPalette.bind(this));
  }

  onAddFoodPalette() {
    this.buttonState++;
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
      width: '520px',
    });
    dialogRef.afterClosed().subscribe((result: IBillEntry[]) => {
      if (result && result.length > 0) {
        result.forEach((palette) => {
          this.foodPalette.add(new FoodItem(palette.item, palette.amount, []));
        });
      }
    });
  }

  removeFoodTile(item: FoodItem) {
    this.foodPalette.remove(item);
    this.buttonState--;
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
