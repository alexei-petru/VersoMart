import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-nav-user-hub',
  templateUrl: './nav-user-hub.component.html',
  styleUrls: ['./nav-user-hub.component.scss'],
})
export class NavUserHubComponent {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | null = null;

  closeMenu() {
    if (this.menuTrigger) this.menuTrigger.closeMenu();
    console.log('\x1b[33m%s\x1b[0m', `nav-user-hub.component H19:10 L13: 'closeMenu'`);
  }
}
