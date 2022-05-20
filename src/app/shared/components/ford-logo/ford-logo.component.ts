import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ford-logo',
  template: `<img
    class="ford-logo img-fluid d-block m-auto"
    [width]="maxWidth"
    src="assets/img/ford.png"
    alt=""
  />`,
})
export class FordLogoComponent {
  @Input() maxWidth = 0;
}
