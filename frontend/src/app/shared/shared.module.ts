import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './components/message/message.component';
import { NavTogglerIconComponent } from './components/nav-toggler-icon/nav-toggler-icon.component';
import { ScrollBlockDirective } from './directives/scroll-block.directive';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    MessageComponent,
    NavTogglerIconComponent,
    ScrollBlockDirective,
    ModalComponent,
  ],
  imports: [CommonModule],
  exports: [
    MessageComponent,
    NavTogglerIconComponent,
    ModalComponent,
    ScrollBlockDirective,
  ],
})
export class SharedModule {}
