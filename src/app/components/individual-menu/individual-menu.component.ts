import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomContributionToggler } from 'src/app/classes/interfaces';
import { Participant } from 'src/app/classes/participant';

@Component({
  selector: 'app-individual-menu',
  templateUrl: './individual-menu.component.html',
  styleUrls: ['./individual-menu.component.scss'],
})
export class IndividualMenuComponent {
  @Input('participant') participant!: Participant;
  @Input('price') price!: number;

  toggleIndex: number = 0;
  togglers: CustomContributionToggler[] = [
    { symbol: '₹', description: 'amount' },
    { symbol: '%', description: 'percent' },
    { symbol: '×', description: 'servings' },
  ];
  @Output() removeParticipant = new EventEmitter();
  onPortionModifier(modifier: number) {
    this.participant.contribution = parseFloat(
      (this.price * modifier).toFixed(2)
    );
  }

  updateCustom(value: string) {
    if (this.toggleIndex == 0)
      this.participant.contribution = Math.round(parseFloat(value) * 100) / 100;
    else if (this.toggleIndex == 1) {
      let contribution = Math.round((this.price * parseFloat(value)) / 100);
      this.participant.contribution = contribution;
    } else {
      let contribution = Math.round(this.price * parseFloat(value) * 100) / 100;
      this.participant.contribution = contribution;
    }
  }

  remove() {
    this.removeParticipant.emit();
  }

  toggleCustom(event: Event) {
    event.stopPropagation();
    this.toggleIndex = (this.toggleIndex + 1) % 3;
  }
}
