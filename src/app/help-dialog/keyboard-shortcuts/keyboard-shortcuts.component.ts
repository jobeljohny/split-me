import { Component } from '@angular/core';
import { shortcuts } from '../help-dialog/help-page-utils';

@Component({
  selector: 'app-keyboard-shortcuts',
  templateUrl: './keyboard-shortcuts.component.html',
  styleUrls: ['./keyboard-shortcuts.component.scss'],
})
export class KeyboardShortcutsComponent {
  get shortcuts() {
    return shortcuts;
  }
}
