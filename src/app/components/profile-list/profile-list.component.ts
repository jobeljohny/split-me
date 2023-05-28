import { CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodPaletteService } from 'src/app/services/food-palette.service';
import { SimpleProfileService } from 'src/app/services/simple-profile.service';
import { CreateProfileModalComponent } from '../create-profile-modal/create-profile-modal.component';
@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent {
  constructor(
    private foodPalette: FoodPaletteService,
    private simpleProfile: SimpleProfileService,
    public dialog: MatDialog
  ) {}

  @HostListener('window:keydown.alt.p', ['$event'])
  keydown(event: KeyboardEvent): void {
    this.onAddProfile();
  }

  removeProfile(profile: string) {
    this.simpleProfile.remove(profile);
  }

  onAddProfile() {
    let dialogRef = this.dialog.open(CreateProfileModalComponent, {
      width: '280px',
      data: this.profiles,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.simpleProfile.add(result);
      }
    });
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
  get selections() {
    return this.simpleProfile.selections;
  }
}
