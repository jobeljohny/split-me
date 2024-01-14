import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ChartData } from 'chart.js';
import { IContributors } from 'src/app/classes/interfaces';
import { DetailsService } from 'src/app/services/details.service';
import { SummaryModalComponent } from '../summary-modal/summary-modal.component';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class DetailModalComponent {
  dataSourceMap: IContributors[];
  dataMatTable: any;

  constructor(
    public dialogRef: MatDialogRef<DetailModalComponent>,
    private dialog: MatDialog,
    private details: DetailsService
  ) {
    this.dataSourceMap = this.details.generateDataSourceMap();
    this.dataMatTable = new MatTableDataSource(this.dataSourceMap);
    this.details.generateIndividualSummary();
  }

  viewSummary() {
    this.dialog.open(SummaryModalComponent, {
      width: '1140px',
      panelClass: 'summaryModal',
    });
  }
}
