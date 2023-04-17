import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FoodItem } from 'src/app/classes/food-item';
import { FoodPaletteService } from 'src/app/services/food-palette.service';

@Component({
  selector: 'app-food-palettes-box',
  templateUrl: './food-palettes-box.component.html',
  styleUrls: ['./food-palettes-box.component.scss'],
})
export class FoodPalettesBoxComponent {
  @ViewChild('itemWrapper') myScrollContainer!: ElementRef;

  @HostListener('window:keydown.alt.f', ['$event'])
  keydown(event: KeyboardEvent): void {
    event.preventDefault();
    this.onAddFoodPalette();
  }

  constructor(private foodPalette: FoodPaletteService) {}
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
}
