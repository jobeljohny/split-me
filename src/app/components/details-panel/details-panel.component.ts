import { Component, ViewChild } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';
import { FoodPaletteService } from 'src/app/services/food-palette.service';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.scss'],
})
export class DetailsPanelComponent {
  @ViewChild('DetailModal') detailModal: DetailModalComponent;
  constructor(
    private foodPalette: FoodPaletteService,
    private details: DetailsService
  ) {
    this.detailModal = new DetailModalComponent(details);
  }

  calcFinalTotal() {
    this.details.calculateFinalTotal();
    this.detailModal.showModal();
  }

  get totalFoodBill() {
    return this.foodPalette.getTotalAmount();
  }

  get finalTotal() {
    return this.details.getCalculatedAmount();
  }
}
