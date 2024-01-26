import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdvancedProfileComponent } from './components/advanced-profile/advanced-profile.component';
import { AmountDisplayComponent } from './components/amount-display/amount-display.component';
import { BillImagePreviewComponent } from './components/bill-image-preview/bill-image-preview.component';
import { BreakUpInfoComponent } from './components/break-up-info/break-up-info.component';
import { BreakUpTableComponent } from './components/break-up-table/break-up-table.component';
import { CreateProfileModalComponent } from './components/create-profile-modal/create-profile-modal.component';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import { DetailsPanelComponent } from './components/details-panel/details-panel.component';
import { DoughnutGraphComponent } from './components/doughnut-graph/doughnut-graph.component';
import { FoodInputFieldComponent } from './components/food-input-field/food-input-field.component';
import { FoodItemPanelComponent } from './components/food-item-panel/food-item-panel.component';
import { FoodPalettesBoxComponent } from './components/food-palettes-box/food-palettes-box.component';
import { GraphContainerComponent } from './components/graph-container/graph-container.component';
import { HeaderHamburgerComponent } from './components/header-hamburger/header-hamburger.component';
import { HeaderComponent } from './components/header/header.component';
import { HelpButtonComponent } from './components/help-button/help-button.component';
import { ImportModalComponent } from './components/import-modal/import-modal.component';
import { IndividualMenuComponent } from './components/individual-menu/individual-menu.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { NameProfileComponent } from './components/name-profile/name-profile.component';
import { OcrParseReviewComponent } from './components/ocr-parse-review/ocr-parse-review.component';
import { ProfileDragPreviewComponent } from './components/profile-drag-preview/profile-drag-preview.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { SummaryModalComponent } from './components/summary-modal/summary-modal.component';
import { SummaryQrModalComponent } from './components/summary-qr-modal/summary-qr-modal.component';
import { SummaryTableComponent } from './components/summary-table/summary-table.component';
import { TaxDiscountPanelComponent } from './components/tax-discount-panel/tax-discount-panel.component';
import { WebsiteMovedDialogComponent } from './components/website-moved-dialog/website-moved-dialog.component';
import { CtrlClickDirective } from './directives/ctrl-click.directive';
import { DarkColorDirective } from './directives/dark-color.directive';
import { DragDropDirective } from './directives/drag-drop.directive';
import { InputClickSelectDirective } from './directives/input-click-select.directive';
import { HelpDialogModule } from './help-dialog/help-dialog.module';
@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    FoodItemPanelComponent,
    NameProfileComponent,
    CreateProfileModalComponent,
    AdvancedProfileComponent,
    TaxDiscountPanelComponent,
    DetailsPanelComponent,
    DetailModalComponent,
    ProfileListComponent,
    FoodPalettesBoxComponent,
    SummaryModalComponent,
    SummaryTableComponent,
    DarkColorDirective,
    SummaryQrModalComponent,
    InputClickSelectDirective,
    CtrlClickDirective,
    ProfileDragPreviewComponent,
    HelpButtonComponent,
    HeaderComponent,
    HeaderHamburgerComponent,
    BreakUpTableComponent,
    BreakUpInfoComponent,
    FoodInputFieldComponent,
    ImportModalComponent,
    DragDropDirective,
    AmountDisplayComponent,
    IndividualMenuComponent,
    DoughnutGraphComponent,
    GraphContainerComponent,
    OcrParseReviewComponent,
    BillImagePreviewComponent,

    WebsiteMovedDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatMenuModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ImageCropperModule,
    HelpDialogModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
