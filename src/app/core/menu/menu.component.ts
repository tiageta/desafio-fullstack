import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('menuAppearDisappear', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('350ms ease-in-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('350ms ease-in-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('overlayAppearDisappear', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms 100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('250ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class MenuComponent {
  isMenuVisible = false;

  constructor(private router: Router) {}

  isRouteActive(url: string): boolean {
    return url === this.router.url;
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
