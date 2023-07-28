import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-break-up-table',
  templateUrl: './break-up-table.component.html',
  styleUrls: ['./break-up-table.component.scss'],
})
export class BreakUpTableComponent implements AfterViewInit {
  @ViewChild(MatSort) sort = new MatSort();
  dataSource!: any;
  constructor(private details: DetailsService) {
    this.dataSource = new MatTableDataSource(
      this.details.generateDataSourceMap()
    );
  }
  displayedColumns: string[] = ['name', 'food_amount', 'split_amount'];
  footerColumns: string[] = ['total_amt', 'total_food_amt', 'total_split_amt'];
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
