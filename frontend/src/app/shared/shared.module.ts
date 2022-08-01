import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './components/message/message.component';
import { NavTogglerIconComponent } from './components/nav-toggler-icon/nav-toggler-icon.component';
import { ScrollBlockDirective } from './directives/scroll-block.directive';

@NgModule({
  declarations: [
    MessageComponent,
    NavTogglerIconComponent,
    ScrollBlockDirective,
  ],
  imports: [CommonModule],
  exports: [MessageComponent, NavTogglerIconComponent, ScrollBlockDirective],
})
export class SharedModule {}
