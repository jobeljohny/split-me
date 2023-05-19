import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdvancedProfileComponent } from './components/advanced-profile/advanced-profile.component';
import { CreateProfileModalComponent } from './components/create-profile-modal/create-profile-modal.component';
import { DetailsPanelComponent } from './components/details-panel/details-panel.component';
import { FoodItemPanelComponent } from './components/food-item-panel/food-item-panel.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { NameProfileComponent } from './components/name-profile/name-profile.component';
import { TaxDiscountPanelComponent } from './components/tax-discount-panel/tax-discount-panel.component';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { FoodPalettesBoxComponent } from './components/food-palettes-box/food-palettes-box.component';
import { SummaryModalComponent } from './components/summary-modal/summary-modal.component';
import { SummaryTableComponent } from './components/summary-table/summary-table.component';
import { DarkColorDirective } from './directives/dark-color.directive';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { SummaryQrModalComponent } from './components/summary-qr-modal/summary-qr-modal.component';
import { InputClickSelectDirective } from './directives/input-click-select.directive';
import { CtrlClickDirective } from './directives/ctrl-click.directive';
import { ProfileDragPreviewComponent } from './components/profile-drag-preview/profile-drag-preview.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatMenuModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    QRCodeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
