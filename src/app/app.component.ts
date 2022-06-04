import { Component, HostListener } from '@angular/core';
import { AutoLoginService } from './core/services/auto-login.service';
import { UserService } from './core/services/user.service';

const LOGIN_TIMEOUT_MS = 10 * 1000; // 10s

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'desafio-angular';

  constructor(
    private userService: UserService,
    private autoLoginService: AutoLoginService
  ) {}

  @HostListener('window:beforeunload')
  beforeUnloadHandler() {
    if (!localStorage) return;
    localStorage['logoutFlag'] = new Date().getTime();
  }

  @HostListener('window:load')
  loadHandler() {
    if (!localStorage) return;
    let lastCloseTime = Number(localStorage['logoutFlag']);
    if (isNaN(lastCloseTime)) lastCloseTime = 0;
    const currentTime = new Date().getTime();

    const timeSinceLastClose = currentTime - lastCloseTime;
    if (
      !this.autoLoginService.isAutoLoginEnabled() &&
      this.userService.isLoggedIn()
    ) {
      if (timeSinceLastClose > LOGIN_TIMEOUT_MS) {
        this.userService.logout();
      }
    }
  }
}
