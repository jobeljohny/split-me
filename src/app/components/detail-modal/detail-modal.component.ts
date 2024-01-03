import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DoughnutData, IContributors } from 'src/app/classes/interfaces';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class DetailModalComponent {
  dataSourceMap: IContributors[];
  dataMatTable: any;
  nameAmountMap:DoughnutData[];
  constructor(
    public dialogRef: MatDialogRef<DetailModalComponent>,
    private details: DetailsService
  ) {
    this.dataSourceMap = this.details.generateDataSourceMap();
    this.dataMatTable = new MatTableDataSource(this.dataSourceMap);
    this.nameAmountMap = this.details.getNameAmountDistribution();
  }

  viewSummary() {
    //   this.details.generateIndividualSummary();
    //   this.dialog.open(SummaryModalComponent, {
    //     width: '1140px',
    //   });
  }
}
