import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Participant } from 'src/app/classes/participant';

@Component({
  selector: 'app-advanced-profile',
  templateUrl: './advanced-profile.component.html',
  styleUrls: ['./advanced-profile.component.scss'],
})
export class AdvancedProfileComponent {
  @Input('participant') participant!: Participant;
  @Input('price') price: number = 0;
  @Output() removeParticipant = new EventEmitter<Participant>();
  @Output() contributionUpdated = new EventEmitter<Participant>();
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger | undefined;
  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';

    if (this.contextMenu != null) {
      this.contextMenu.openMenu();
    }
  }
  constructor() {}

  get color() {
    return `hue-rotate(${this.participant.profile.hue}deg) grayscale(0.5)`;
  }

  //Context menu options

  OnContributionUpdated(){
    this.contributionUpdated.emit(this.participant);
  }

  remove() {
    this.removeParticipant.emit(this.participant);
  }
}
