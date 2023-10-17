import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { AuthButtonsComponent } from '../shared/components/buttons/auth-buttons/auth-buttons.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { QuickSettingsComponent } from '../shared/components/quick-settings/quick-settings.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    AuthButtonsComponent,
    SidenavComponent,
    QuickSettingsComponent,
    CookieBannerComponent,
  ],
  imports: [SharedModule, AppRoutingModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    AuthButtonsComponent,
    SidenavComponent,
    QuickSettingsComponent,
    CookieBannerComponent,
  ],
})
export class CoreModule {}
