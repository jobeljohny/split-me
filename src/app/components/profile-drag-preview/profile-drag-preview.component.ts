import { Component, Input } from '@angular/core';
import { Profile } from 'src/app/classes/profile';

@Component({
  selector: 'app-profile-drag-preview',
  templateUrl: './profile-drag-preview.component.html',
  styleUrls: ['./profile-drag-preview.component.scss'],
})
export class ProfileDragPreviewComponent {
  @Input('people') people!: Profile;
  @Input('selections') selections!: Profile[];
  get text() {
    if (this.selections.length > 1) {
      return (
        this.selections[0].name +
        ' + ' +
        (this.selections.length - 1) +
        ' other(s)'
      );
    } else return this.people.name;
  }
  get count() {
    if (this.selections.length > 1) return this.selections.length;
    else return 1;
  }
}
