import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import html2canvas from 'html2canvas';
import { DetailsService } from 'src/app/services/details.service';
import { SummaryExportService } from 'src/app/services/summary-export.service';
import { SummaryQrModalComponent } from '../summary-qr-modal/summary-qr-modal.component';

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

  constructor(
    private details: DetailsService,
    private summaryExport: SummaryExportService
  ) {
    this.QrModal = new SummaryQrModalComponent();
    summaryExport.qrLink$.subscribe((link) => {
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
  async downloadAs(type: 'qr' | 'img' | 'pdf') {
    if (type === 'qr') {
      this.QrModal.showModal();
    }
    this.isDownloadOptions = false;

    try {
      const { offsetWidth: cWidth, offsetHeight: cHeight } =
        this.summaryBody.nativeElement;
      const canvas = await html2canvas(this.summaryBody.nativeElement, {
        scrollY: -window.scrollY,
      });
      this.summaryExport.download(canvas, cWidth, cHeight, type);
    } catch (error) {
      console.error('Error during screenshot generation:', error);
    }
  }
}
