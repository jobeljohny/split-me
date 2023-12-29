import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { selectionStatus } from 'src/app/classes/interfaces';
import { Profile } from 'src/app/classes/profile';
import { SimpleProfileService } from 'src/app/services/simple-profile.service';

@Component({
  selector: 'app-name-profile',
  templateUrl: './name-profile.component.html',
  styleUrls: ['./name-profile.component.scss'],
})
export class NameProfileComponent implements OnInit, OnDestroy {
  @Input() profileData!: Profile;
  @Output() removeUser = new EventEmitter<string>();
  isSelected: boolean = false;
  @Input() isSelectionEnabled: boolean = false;
  private selectionClearedSub: Subscription | undefined;

  constructor(private profilesService: SimpleProfileService) {}
  ngOnInit() {
    this.selectionClearedSub = this.profilesService.selectionCleared.subscribe(
      () => {
        this.isSelected = false;
      }
    );
  }
  removeProfile() {
    this.removeUser.emit(this.profileData.name);
  }

  get color() {
    return `hue-rotate(${this.profileData.hue}deg) grayscale(0.5)`;
  }

  selected() {
    this.isSelected = !this.isSelected;
    let status: selectionStatus = {
      profile: this.profileData,
      status: this.isSelected,
    };
    this.profilesService.onSelectionUpdated(status);
  }

  ngOnDestroy() {
    this.selectionClearedSub?.unsubscribe();
  }
}
