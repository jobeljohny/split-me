import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsService } from 'src/app/services/details.service';
import { SummaryModalComponent } from '../summary-modal/summary-modal.component';

@Component({
  selector: 'app-break-up-info',
  templateUrl: './break-up-info.component.html',
  styleUrls: ['./break-up-info.component.scss'],
})
export class BreakUpInfoComponent {
  constructor(private details: DetailsService, private dialog: MatDialog) {}
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

 
}
