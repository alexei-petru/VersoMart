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
import { CookieAgreementModalComponent } from './components/cookie-banner/cookie-agreement-modal/cookie-agreement-modal.component';
import { HomeComponent } from './components/home/home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent,
    AuthButtonsComponent,
    SidenavComponent,
    QuickSettingsComponent,
    CookieBannerComponent,
    CookieAgreementModalComponent,
  ],
  imports: [SharedModule, AppRoutingModule, MatTabsModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent,
    AuthButtonsComponent,
    SidenavComponent,
    QuickSettingsComponent,
    CookieBannerComponent,
    CookieAgreementModalComponent,
  ],
})
export class CoreModule {}
