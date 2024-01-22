import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodItem } from 'src/app/classes/food-item';
import { FoodPaletteService } from 'src/app/services/food-palette.service';
import { KeyBindingService } from 'src/app/services/keybinding.service';
import { ImportModalComponent } from '../import-modal/import-modal.component';
import { HelpDialogComponent } from '../Help-Page/help-dialog/help-dialog.component';
import { pages } from '../Help-Page/help-dialog/help-page-utils';
import { IBillEntry } from 'src/app/classes/interfaces';
import {
  animate,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-food-palettes-box',
  templateUrl: './food-palettes-box.component.html',
  styleUrls: ['./food-palettes-box.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition('* => void',[]),
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter',
          stagger('200ms', [
            animate(
              '.4s ease-in',
              keyframes([
                style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(-10px) scale(1.1)',
                  offset: 0.3,
                }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
              ])
            ),
          ]),
          { optional: true }
        ),
        query(
          ':leave',
          stagger('200ms', [
            animate(
              '0.4s ease-out',
              keyframes([
                style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
                style({ opacity: 0.5, transform: 'scale(.5)', offset: 0.3 }),
                style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
              ])
            ),
          ]),
          { optional: true }
        ),
      ]),
    ]),
  ],
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
   //   this.onImportBill();
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
