import { Component } from '@angular/core';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent {
 
  currentDisplay:string='Home';

  showText(text: string): void {
    this.currentDisplay = text;
  }
}
