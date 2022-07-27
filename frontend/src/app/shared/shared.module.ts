import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './components/message/message.component';
import { NavTogglerIconComponent } from './components/nav-toggler-icon/nav-toggler-icon.component';

@NgModule({
  declarations: [MessageComponent, NavTogglerIconComponent],
  imports: [CommonModule],
  exports: [MessageComponent, NavTogglerIconComponent],
})
export class SharedModule {}
