import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SummaryExportService } from 'src/app/services/summary-export.service';

@Component({
  selector: 'app-summary-qr-modal',
  templateUrl: './summary-qr-modal.component.html',
  styleUrls: ['./summary-qr-modal.component.scss'],
})
export class SummaryQrModalComponent {
  isLoading = true;
  link: string = 'unknown';

  constructor(
    public dialogRef: MatDialogRef<SummaryQrModalComponent>,
    private summaryExport: SummaryExportService
  ) {
    this.summaryExport.qrLink$.subscribe((link) => {
      this.link = link;
    });
  }

  onChangeURL(event: any) {
    if (this.link != 'unknown') {
      this.isLoading = false;
    }
  }
}
