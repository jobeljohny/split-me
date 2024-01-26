import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { KeyboardShortcutsComponent } from './keyboard-shortcuts/keyboard-shortcuts.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { InstructionsPageComponent } from './instructions-page/instructions-page.component';
import { GettingStartedComponent } from './instruction-slides/getting-started/getting-started.component';
import { ProfilePanelHelpComponent } from './instruction-slides/profile-panel-help/profile-panel-help.component';
import { FoodPaletteHelpComponent } from './instruction-slides/food-palette-help/food-palette-help.component';
import { PaletteProfilingHelpComponent } from './instruction-slides/palette-profiling-help/palette-profiling-help.component';
import { DetailsPanelHelpComponent } from './instruction-slides/details-panel-help/details-panel-help.component';

@NgModule({
  declarations: [
    HelpDialogComponent,
    ReleaseNotesComponent,
    KeyboardShortcutsComponent,
    AboutPageComponent,
    InstructionsPageComponent,
    GettingStartedComponent,
    ProfilePanelHelpComponent,
    FoodPaletteHelpComponent,
    PaletteProfilingHelpComponent,
    DetailsPanelHelpComponent,
  ],
  exports: [HelpDialogComponent],
  imports: [CommonModule],
})
export class HelpDialogModule {}
