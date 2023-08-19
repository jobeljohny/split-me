import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angularx-qrcode';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutPageComponent } from './components/Help-Page/about-page/about-page.component';
import { HelpButtonComponent } from './components/Help-Page/help-button/help-button.component';
import { HelpDialogComponent } from './components/Help-Page/help-dialog/help-dialog.component';
import { InstructionsPageComponent } from './components/Help-Page/instructions-page/instructions-page.component';
import { KeyboardShortcutsComponent } from './components/Help-Page/keyboard-shortcuts/keyboard-shortcuts.component';
import { ReleaseNotesComponent } from './components/Help-Page/release-notes/release-notes.component';
import { AdvancedProfileComponent } from './components/advanced-profile/advanced-profile.component';
import { CreateProfileModalComponent } from './components/create-profile-modal/create-profile-modal.component';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import { DetailsPanelComponent } from './components/details-panel/details-panel.component';
import { FoodItemPanelComponent } from './components/food-item-panel/food-item-panel.component';
import { FoodPalettesBoxComponent } from './components/food-palettes-box/food-palettes-box.component';
import { HeaderHamburgerComponent } from './components/header-hamburger/header-hamburger.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { NameProfileComponent } from './components/name-profile/name-profile.component';
import { ProfileDragPreviewComponent } from './components/profile-drag-preview/profile-drag-preview.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { SummaryModalComponent } from './components/summary-modal/summary-modal.component';
import { SummaryQrModalComponent } from './components/summary-qr-modal/summary-qr-modal.component';
import { SummaryTableComponent } from './components/summary-table/summary-table.component';
import { TaxDiscountPanelComponent } from './components/tax-discount-panel/tax-discount-panel.component';
import { CtrlClickDirective } from './directives/ctrl-click.directive';
import { DarkColorDirective } from './directives/dark-color.directive';
import { InputClickSelectDirective } from './directives/input-click-select.directive';
import { BreakUpTableComponent } from './components/break-up-table/break-up-table.component';
import { BreakUpInfoComponent } from './components/break-up-info/break-up-info.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FoodInputFieldComponent } from './components/food-input-field/food-input-field.component';

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
    HelpDialogComponent,
    HeaderComponent,
    HeaderHamburgerComponent,
    ReleaseNotesComponent,
    KeyboardShortcutsComponent,
    AboutPageComponent,
    InstructionsPageComponent,
    BreakUpTableComponent,
    BreakUpInfoComponent,
    FoodInputFieldComponent,
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
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    QRCodeModule,
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
