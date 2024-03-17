import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponentComponent } from './components/main-component/main-component.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponentComponent,
  },
  {
    path: 'room/:roomId',
    component: MainComponentComponent,
  },

  {
    path: 'help',
    loadChildren: () =>
      import('./help-dialog/help-dialog.module').then(
        (m) => m.HelpDialogModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
