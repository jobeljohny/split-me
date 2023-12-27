import { Component, HostListener } from '@angular/core';
import { KeyBindingService } from './services/keybinding.service';
import { FoodPaletteService } from './services/food-palette.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'split-me';

  constructor(
    private keyBinding: KeyBindingService,
    private foodPaletteService: FoodPaletteService
  ) {}

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
}
