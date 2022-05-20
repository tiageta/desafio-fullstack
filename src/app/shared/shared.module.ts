import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FordLogoComponent } from './components/ford-logo/ford-logo.component';

@NgModule({
  declarations: [FordLogoComponent],
  imports: [CommonModule],
  exports: [FordLogoComponent],
})
export class SharedModule {}
