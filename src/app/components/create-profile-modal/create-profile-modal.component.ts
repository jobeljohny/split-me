import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Profile } from 'src/app/classes/profile';
import { isDuplicateValidator } from 'src/app/classes/validators';
@Component({
  selector: 'app-create-profile-modal',
  templateUrl: './create-profile-modal.component.html',
  styleUrls: ['./create-profile-modal.component.scss'],
})
export class CreateProfileModalComponent {
  angForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile[]
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          (control: AbstractControl) =>
            isDuplicateValidator(this.data.map((profile) => profile.name))(
              control
            ),
        ],
      ],
    });
  }
}
