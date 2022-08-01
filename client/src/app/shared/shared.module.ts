import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './components/message/message.component';
import { NavTogglerIconComponent } from './components/nav-toggler-icon/nav-toggler-icon.component';
import { ScrollBlockDirective } from './directives/scroll-block.directive';
import { LoadingComponent } from './components/loading/loading.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';

@NgModule({
  declarations: [
    MessageComponent,
    NavTogglerIconComponent,
    ScrollBlockDirective,
    LoadingComponent,
    AlertModalComponent,
  ],
  imports: [CommonModule],
  exports: [
    MessageComponent,
    NavTogglerIconComponent,
    LoadingComponent,
    AlertModalComponent,
    ScrollBlockDirective,
  ],
})
export class SharedModule {}
