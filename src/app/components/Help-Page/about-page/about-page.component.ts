import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent {
  @Output('onHelp') onHelp = new EventEmitter();
  goToHelpPage() {
    this.onHelp.emit();
  }
}
