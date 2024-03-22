import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-nickname-modal',
  templateUrl: './nickname-modal.component.html',
  styleUrls: ['./nickname-modal.component.scss'],
})
export class NicknameModalComponent {
  angForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NicknameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.createForm();
    this.fetchNicknameFromStorage();
  }
  createForm() {
    this.angForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  fetchNicknameFromStorage() {
    let nickname = localStorage.getItem('nickname');
    console.log(nickname);
    
    if (nickname != null) {
      this.angForm.patchValue({
        name: nickname,
      });
      this.angForm.markAsDirty();
      this.angForm.markAllAsTouched();
    }
  }

  submitForm() {
    if (this.angForm.valid) {
      const nickname = this.angForm.value['name'];
      localStorage.setItem('nickname', nickname);
      this.dialogRef.close(nickname);
    }
  }
}
