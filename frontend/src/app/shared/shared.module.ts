import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './components/message/message.component';
import { NavTogglerIconComponent } from './components/nav-toggler-icon/nav-toggler-icon.component';
import { ScrollBlockDirective } from './directives/scroll-block.directive';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    MessageComponent,
    NavTogglerIconComponent,
    ScrollBlockDirective,
    LoadingComponent,
  ],
  imports: [CommonModule],
  exports: [
    MessageComponent,
    NavTogglerIconComponent,
    LoadingComponent,
    ScrollBlockDirective,
  ],
})
export class SharedModule {}
