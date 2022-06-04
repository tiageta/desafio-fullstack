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

  @HostListener('window:unload')
  beforeUnloadHandler() {
    if (!localStorage) return;
    localStorage['logoutFlag'] = Date.now();
  }

  @HostListener('window:load')
  loadHandler() {
    if (!localStorage) return;
    let startTime = Number(localStorage['logoutFlag']);
    if (isNaN(startTime)) startTime = 0;
    const endTime = Date.now();

    const totalTime = endTime - startTime;
    if (
      !this.autoLoginService.isAutoLoginEnabled() &&
      this.userService.isLoggedIn()
    ) {
      if (totalTime > LOGIN_TIMEOUT_MS) {
        this.userService.logout();
      }
    }
  }
}
