import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import html2canvas from 'html2canvas';
import { DetailsService } from 'src/app/services/details.service';
import { SummaryExportService } from 'src/app/services/summary-export.service';

@Component({
  selector: 'app-summary-modal',
  templateUrl: './summary-modal.component.html',
  styleUrls: ['./summary-modal.component.scss'],
})
export class SummaryModalComponent implements AfterViewInit {
  @ViewChild('SummaryModal') Modal: any;
  @ViewChild('SummaryBody')
  summaryBody!: ElementRef;
  myModal: any;
  isDownloadOptions: boolean = false;
  constructor(
    private details: DetailsService,
    private summaryExport: SummaryExportService
  ) {}
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
    this.isDownloadOptions = false;
    setTimeout(() => {
      this.initiateDownload(type);
    }, 0);
  }

  async initiateDownload(type: string) {
    let summaryContent = this.summaryBody.nativeElement;
    await html2canvas(summaryContent, {
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const cWidth = summaryContent.offsetWidth;
      const cHeight = summaryContent.offsetHeight;
      this.summaryExport.download(canvas, cWidth, cHeight, type);
    });
  }
}
