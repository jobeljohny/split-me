import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Modal } from 'bootstrap';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class DetailModalComponent implements AfterViewInit {
  @ViewChild('DetailModal') Modal: any;
  @ViewChild(MatSort) sort = new MatSort();
  myModal: any;
  dataSource: any;

  constructor(private details: DetailsService) {}

  ngAfterViewInit() {
    this.myModal = new Modal(this.Modal.nativeElement, {
      backdrop: 'static',
      keyboard: true,
    });
  }

  displayedColumns: string[] = ['name', 'food_amount', 'split_amount'];
  footerColumns: string[] = ['total_amt', 'total_food_amt', 'total_split_amt'];

  showModal() {
    this.dataSource = new MatTableDataSource(
      this.details.generateDataSourceMap()
    );
    this.dataSource.sort = this.sort;
    this.myModal.show();
  }
  get totalFoodBill() {
    return this.details.totalFoodAmount;
  }

  get finalTotal() {
    return this.details.finalTotal;
  }

  get participants() {
    return this.details.participantsCount;
  }

  viewSummary() {
    console.log('viewing summary');
  }
}
