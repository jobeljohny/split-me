import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionType } from 'src/app/classes/constants';
import { FoodItem } from 'src/app/classes/food-item';
import { Participant } from 'src/app/classes/participant';
import { Profile } from 'src/app/classes/profile';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-food-item-panel',
  templateUrl: './food-item-panel.component.html',
  styleUrls: ['./food-item-panel.component.scss'],
})
export class FoodItemPanelComponent {
  @Input() foodData!: FoodItem;
  @Input() paletteIds: string[] = [];
  @Output() removePanel = new EventEmitter<FoodItem>();

  totalRate: number = 0;
  constructor(private store: StoreService) {}

  changes(type: string) {
    if (type === 'price') {
      this.foodData.updatePrices();
    }
  }

  updateName(foodName: string) {
    this.foodData.name = foodName;
  }

  updateIcon(icon: string) {
    this.foodData.logo = icon;
  }

  removePalette() {
    this.removePanel.emit(this.foodData);
  }
  removeParticipant(p: Participant) {
    this.foodData.participants = this.foodData.participants.filter(
      (x) => x.name !== p.name
    );
    this.store.fireAction(ActionType.REMOVE_PARTICIPANT, {
      name: p.name,
      palette: this.foodData.id,
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    event.item.data.forEach((profile: Profile) => {
      let participant = new Participant(profile, this.foodData.price);
      this.foodData.addParticipant(participant);
    });
    this.store.fireAction(ActionType.ADD_PARTICIPANT, {
      participants: event.item.data,
      palette: this.foodData.id,
    });
  }

  onMenuOption(option: string) {
    switch (option) {
      case 'reset':
        this.foodData.resetDefaultPrice();
        break;
      case 'split':
        this.foodData.splitEvenly();
        break;
      case 'clear':
        this.foodData.removeAllParticipants();
        break;
    }
  }

  //drag events
  dragStarted(ev: CdkDragStart, participant: Participant): void {
    ev.source.data = [participant.profile];
  }
  dragEnded() {
    //nothing for now
  }

  get participants() {
    return this.foodData.participants;
  }
}
