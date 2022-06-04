import { Component, HostListener } from '@angular/core';
import { AutoLoginService } from './core/services/auto-login.service';
import { UserService } from './core/services/user.service';

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
    const lastCloseTime = Number(localStorage['logoutFlag']) ?? 0;
    const currentTime = new Date().getTime();

    const timeSinceLastClose = currentTime - lastCloseTime;
    if (
      !this.autoLoginService.isAutoLoginEnabled() &&
      this.userService.isLoggedIn()
    ) {
      if (timeSinceLastClose > 1 * 1000) {
        this.userService.logout();
      }
    }
  }
}
