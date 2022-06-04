import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [HeaderComponent, MenuComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [HeaderComponent, MenuComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Core module should only be imported in root module');
    }
  }
}
