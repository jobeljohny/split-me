import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-summary-qr-modal',
  templateUrl: './summary-qr-modal.component.html',
  styleUrls: ['./summary-qr-modal.component.scss'],
})
export class SummaryQrModalComponent {
  @ViewChild('SummaryQR') Modal: any;
  myModal: any;
  @Input('link') QR: string = 'unknown';
  isLoading = true;
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  generateString(length: number) {
    let result = ' ';
    const charactersLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      result += this.characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    return result;
  }
  constructor() {}

  ngAfterViewInit() {
    this.myModal = new Modal(this.Modal.nativeElement, {
      backdrop: 'static',
      keyboard: true,
    });
  }
  showModal() {
    this.myModal.show();
  }
  close() {
    this.myModal.hide();
    this.QR = 'unknown';
    this.isLoading = true;
  }
  onChangeURL(event: any) {
    if (this.QR != 'unknown') {
      this.isLoading = false;
    }
  }
}
