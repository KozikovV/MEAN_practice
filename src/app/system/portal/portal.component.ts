import { Component, ViewChildren } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})

export class PortalComponent {

  @ViewChildren(MatSidenav) sidenav: MatSidenav;

  toggleProfile: boolean = false;
  toggleNavigation: boolean = false;

  constructor() {}

  showSidenav(side: string): void {
    side === 'prof' ? this.toggleProfile = !this.toggleProfile : this.toggleNavigation = !this.toggleNavigation;
  }
}
