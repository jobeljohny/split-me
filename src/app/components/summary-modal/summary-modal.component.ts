import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { IndividualSummary } from 'src/app/classes/individual-summary';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-summary-modal',
  templateUrl: './summary-modal.component.html',
  styleUrls: ['./summary-modal.component.scss'],
})
export class SummaryModalComponent implements AfterViewInit {
  @ViewChild('SummaryModal') Modal: any;
  myModal: any;
  constructor(private details: DetailsService) {}
  ngAfterViewInit() {
    this.myModal = new Modal(this.Modal.nativeElement, {
      backdrop: 'static',
      keyboard: true,
    });
  }

  showModal() {
    this.myModal.show();
  }

  get summary() {
    return this.details.individualSummaries;
  }
}
