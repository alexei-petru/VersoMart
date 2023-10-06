import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { AuthButtonsComponent } from './components/shared-in-core/auth-buttons/auth-buttons.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { QuickSettingsComponent } from './components/shared-in-core/quick-settings/quick-settings.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    AuthButtonsComponent,
    SidenavComponent,
    QuickSettingsComponent,
  ],
  imports: [SharedModule, AppRoutingModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    AuthButtonsComponent,
    SidenavComponent,
    QuickSettingsComponent,
  ],
})
export class CoreModule {}
