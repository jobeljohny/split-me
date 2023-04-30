import { Component, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-summary-qr-modal',
  templateUrl: './summary-qr-modal.component.html',
  styleUrls: ['./summary-qr-modal.component.scss'],
})
export class SummaryQrModalComponent {
  @ViewChild('SummaryQR') Modal: any;
  myModal: any;
  QR: string;
  constructor() {
    this.QR = 'unknown';
  }
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
  }
}
