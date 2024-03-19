import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nickname-modal',
  templateUrl: './nickname-modal.component.html',
  styleUrls: ['./nickname-modal.component.scss'],
})
export class NicknameModalComponent {
  angForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
