import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule],
})
export class LoginModule {}
