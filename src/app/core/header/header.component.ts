import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('popoverInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HeaderComponent {
  user$ = this.userService.getUser();
  isPopoverVisible = false;

  constructor(private userService: UserService, private router: Router) {}

  togglePopover(event: Event): void {
    const userIcon = event.currentTarget;
    if (!(userIcon instanceof HTMLElement)) return;

    this.isPopoverVisible = !this.isPopoverVisible;
    if (this.isPopoverVisible) userIcon.focus();
    else userIcon.blur();
  }

  hidePopover(): void {
    this.isPopoverVisible = false;
  }

  logout(): void {
    this.userService.logout();
    this.hidePopover();
    this.router.navigate(['']);
  }

  isUserLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
