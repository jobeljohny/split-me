import { Component, ElementRef, ViewChild } from '@angular/core';
import { FoodItem } from 'src/app/classes/food-item';
import { FoodPaletteService } from 'src/app/services/food-palette.service';
import { KeyBindingService } from 'src/app/services/keybinding.service';

@Component({
  selector: 'app-food-palettes-box',
  templateUrl: './food-palettes-box.component.html',
  styleUrls: ['./food-palettes-box.component.scss'],
})
export class FoodPalettesBoxComponent {
  @ViewChild('itemWrapper') myScrollContainer!: ElementRef;

  constructor(
    private foodPalette: FoodPaletteService,
    private keyBinding: KeyBindingService
  ) {
    this.keyBinding.handleAltF(this.onAddFoodPalette.bind(this));
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

  removeFoodTile(item: FoodItem) {
    this.foodPalette.remove(item);
  }

  get palettes() {
    return this.foodPalette.palettes;
  }

  get ids() {
    return this.foodPalette.paletteIDs;
  }
}
