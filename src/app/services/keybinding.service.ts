import { Injectable } from '@angular/core';
import { KeyboardKey } from '../constants/keyboard-key.constants';
@Injectable({
  providedIn: 'root',
})
export class KeyBindingService {
  constructor() {}
  private AddProfile!: () => void;
  private AddFoodPalette!: () => void;
  private OpenHelpPage!: () => void;

  keydown(event: KeyboardEvent) {
    if (event.altKey) {
      event.preventDefault();
      switch (event.code) {
        case KeyboardKey.F:
          this.AddFoodPalette();
          break;
        case KeyboardKey.P:
          this.AddProfile();
          break;
        case KeyboardKey.H:
          this.OpenHelpPage();
          break;
      }
    }
  }

  handleAltF(fn: () => void) {
    this.AddFoodPalette = fn;
  }

  handleAltH(fn: () => void) {
    this.OpenHelpPage = fn;
  }

  handleAltP(fn: () => void) {
    this.AddProfile = fn;
  }
}
