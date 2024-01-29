import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsService } from 'src/app/services/details.service';
import { FoodPaletteService } from 'src/app/services/food-palette.service';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.scss'],
})
export class DetailsPanelComponent {
  constructor(
    private foodPalette: FoodPaletteService,
    private details: DetailsService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  calcFinalTotal() {
    this.details.calculateFinalTotal();
    if (this.details.contributorsMap.size > 0) {
      this.dialog.open(DetailModalComponent, {
        width: '1200px',
        height: '600px',
        panelClass: 'split-me-modal',
      });
    } else {
      this.toastr.error('No Participants present');
    }
  }

  get totalFoodBill() {
    return this.foodPalette.getTotalAmount();
  }

  get finalTotal() {
    return this.details.getCalculatedAmount();
  }
}
