import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { AuthButtonsComponent } from './components/header/auth-buttons/auth-buttons.component';
import { HeaderComponent } from './components/header/header.component';
import { NavUserHubComponent } from './components/header/nav-user-hub/nav-user-hub.component';
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
    NavUserHubComponent,
    QuickSettingsComponent,
  ],
  imports: [SharedModule, AppRoutingModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    AuthButtonsComponent,
    SidenavComponent,
    NavUserHubComponent,
    QuickSettingsComponent,
  ],
})
export class CoreModule {}
