import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { DetailsService } from 'src/app/services/details.service';
import { SummaryExportService } from 'src/app/services/summary-export.service';
import { SummaryQrModalComponent } from '../summary-qr-modal/summary-qr-modal.component';

@Component({
  selector: 'app-summary-modal',
  templateUrl: './summary-modal.component.html',
  styleUrls: ['./summary-modal.component.scss'],
})
export class SummaryModalComponent {
  @ViewChild('SummaryBody')
  summaryBody!: ElementRef;
  isDownloadOptions: boolean = false;

  constructor(
    private details: DetailsService,
    private summaryExport: SummaryExportService,
    public dialogRef: MatDialogRef<SummaryModalComponent>,
    private dialog: MatDialog
  ) {}

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
    this.isDownloadOptions = false;
    if (type === 'qr') {
      this.dialog.open(SummaryQrModalComponent, {
        width: '550px',
      });
    }

    try {
      const summaryBody = this.summaryBody.nativeElement;
      const { offsetWidth: cWidth, offsetHeight: cHeight } = summaryBody;
      const canvas = await html2canvas(summaryBody, {
        scrollY: -window.scrollY,
      });
      this.summaryExport.download(canvas, cWidth, cHeight, type);
    } catch (error) {
      console.warn('Error during screenshot generation:', error);
    }
  }
}
