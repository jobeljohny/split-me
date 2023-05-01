import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import html2canvas from 'html2canvas';
import { DetailsService } from 'src/app/services/details.service';
import { SummaryExportService } from 'src/app/services/summary-export.service';
import { SummaryQrModalComponent } from '../summary-qr-modal/summary-qr-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-summary-modal',
  templateUrl: './summary-modal.component.html',
  styleUrls: ['./summary-modal.component.scss'],
})
export class SummaryModalComponent implements AfterViewInit {
  @ViewChild('SummaryModal') Modal: any;
  @ViewChild('summaryQR') QrModal: SummaryQrModalComponent;
  @ViewChild('SummaryBody')
  summaryBody!: ElementRef;
  myModal: any;
  link: string = 'unknown';
  isDownloadOptions: boolean = false;
  subscription: Subscription;
  constructor(
    private details: DetailsService,
    private summaryExport: SummaryExportService
  ) {
    this.QrModal = new SummaryQrModalComponent();
    this.subscription = summaryExport.qrLink$.subscribe((link) => {
      console.log('QR updated: ' + link);

      this.link = link;
    });
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
  onBodyClicked() {
    this.isDownloadOptions = false;
  }

  get summary() {
    return this.details.individualSummaries;
  }

  onDownload() {
    this.isDownloadOptions = !this.isDownloadOptions;
  }
  async downloadAs(type: string) {
    if (type === 'qr') this.QrModal.showModal();
    this.isDownloadOptions = false;

    this.initiateDownload(type);
  }

  async initiateDownload(type: string) {
    let summaryContent = this.summaryBody.nativeElement;
    await html2canvas(summaryContent, {
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const cWidth = summaryContent.offsetWidth;
      const cHeight = summaryContent.offsetHeight;
      console.log('canvas conversion completed');

      this.summaryExport.download(canvas, cWidth, cHeight, type);
    });
  }
}
