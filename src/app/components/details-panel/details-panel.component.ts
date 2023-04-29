import { Component, ViewChild } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';
import { FoodPaletteService } from 'src/app/services/food-palette.service';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import { SummaryExportService } from 'src/app/services/summary-export.service';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.scss'],
})
export class DetailsPanelComponent {
  @ViewChild('DetailModal') detailModal: DetailModalComponent;
  constructor(
    private foodPalette: FoodPaletteService,
    private details: DetailsService,
    private summaryExport: SummaryExportService
  ) {
    this.detailModal = new DetailModalComponent(details, summaryExport);
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
