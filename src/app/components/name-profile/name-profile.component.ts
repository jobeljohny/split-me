import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from 'src/app/classes/profile';

@Component({
  selector: 'app-name-profile',
  templateUrl: './name-profile.component.html',
  styleUrls: ['./name-profile.component.scss'],
})
export class NameProfileComponent {
  @Input() profileData!: Profile;
  @Output() removeUser = new EventEmitter<string>();

  removeProfile() {
    this.removeUser.emit(this.profileData.name);
  }

  get color() {
    return `hue-rotate(${this.profileData.hue}deg)`;
  }
}
