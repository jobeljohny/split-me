import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DetailsService } from 'src/app/services/details.service';
import { SummaryModalComponent } from '../summary-modal/summary-modal.component';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class DetailModalComponent implements AfterViewInit {
  @ViewChild(MatSort) sort = new MatSort();
  dataSource!: any;

  constructor(
    private details: DetailsService,
    public dialogRef: MatDialogRef<DetailModalComponent>,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(
      this.details.generateDataSourceMap()
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['name', 'food_amount', 'split_amount'];
  footerColumns: string[] = ['total_amt', 'total_food_amt', 'total_split_amt'];

  get totalFoodBill() {
    return this.details.totalFoodAmount;
  }

  get finalTotal() {
    return this.details.finalTotal;
  }

  get participants() {
    return this.details.participantsCount;
  }

  get totalDishes() {
    return this.details.dishesCount;
  }

  viewSummary() {
    this.details.generateIndividualSummary();
    this.dialog.open(SummaryModalComponent, {
      width: '1140px',
    });
  }
}
