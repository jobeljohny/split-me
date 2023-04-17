import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Modal } from 'bootstrap';
import { isDuplicateValidator } from 'src/app/classes/validators';
@Component({
  selector: 'app-create-profile-modal',
  templateUrl: './create-profile-modal.component.html',
  styleUrls: ['./create-profile-modal.component.scss'],
})
export class CreateProfileModalComponent implements AfterViewInit {
  @ViewChild('profileModal') Modal: any;
  @ViewChild('ModalInput')
  ModalInput!: ElementRef;
  @Input('existingProfiles') existingProfiles: string[] = [];
  @Output('addProfile') addProfile = new EventEmitter<string>();
  myModal: any;

  angForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          (control: AbstractControl) =>
            isDuplicateValidator(this.existingProfiles)(control),
        ],
      ],
    });
  }

  ngAfterViewInit(): void {
    this.myModal = new Modal(this.Modal.nativeElement, {
      backdrop: 'static',
      keyboard: true,
    });
  }

  showModal() {
    this.angForm.reset();
    this.myModal.show();
    setTimeout(() => {
      this.ModalInput.nativeElement.focus();
    }, 500);
  }

  onSubmit() {
    this.addProfile.emit(this.angForm.value['name']);
    this.myModal.hide();
  }
}
