import { CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, HostListener, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FoodPaletteService } from 'src/app/services/food-palette.service';
import { SimpleProfileService } from 'src/app/services/simple-profile.service';
import { CreateProfileModalComponent } from '../create-profile-modal/create-profile-modal.component';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent {
  @ViewChild('ProfileModal') profileModal: CreateProfileModalComponent;

  constructor(
    fb: FormBuilder,
    private foodPalette: FoodPaletteService,
    private simpleProfile: SimpleProfileService
  ) {
    this.profileModal = new CreateProfileModalComponent(fb);
  }

  @HostListener('window:keydown.alt.p', ['$event'])
  keydown(event: KeyboardEvent): void {
    this.onAddProfile();
  }
  removeProfile(profile: string) {
    this.simpleProfile.remove(profile);
  }

  addNewProfile(profile: string) {
    this.simpleProfile.add(profile);
  }

  onAddProfile() {
    this.profileModal.showModal();
  }

  export() {
    this.simpleProfile.exportProfiles();
  }
  onFileInput(e: any) {
    this.simpleProfile.importProfiles(e.target.files[0]);
  }

  dragStarted(ev: CdkDragStart): void {
    if (this.simpleProfile.selections.length) {
      const indices = this.simpleProfile.selections;
      ev.source.data = {
        indices,
        values: this.simpleProfile.selections,
        source: this,
      };
    }
  }
  dragEnded() {
    this.clearSelections();
  }
  clearSelections() {
    this.simpleProfile.clearSelection();
  }

  get paletteIDs() {
    return this.foodPalette.paletteIDs;
  }
  get profiles() {
    return this.simpleProfile.profiles;
  }
  get selectionEnabled() {
    return this.simpleProfile.selections.length != 0;
  }
  get selections(){
    return this.simpleProfile.selections;
  }
}
