import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FordLogoComponent } from './components/ford-logo/ford-logo.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [FordLogoComponent, MessageComponent],
  imports: [CommonModule],
  exports: [FordLogoComponent, MessageComponent],
})
export class SharedModule {}
