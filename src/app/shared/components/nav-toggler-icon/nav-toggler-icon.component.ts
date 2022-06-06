import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-toggler-icon',
  templateUrl: './nav-toggler-icon.component.html',
  styleUrls: ['./nav-toggler-icon.component.scss'],
  animations: [
    trigger('topLine', [
      state('open', style({ transform: 'translateY(0)', opacity: 1 })),
      state('close', style({ transform: 'translateY(6px)', opacity: 0 })),
      transition(
        'open => close',
        animate('125ms', style({ transform: 'translateY(6px)' }))
      ),
      transition('close => open', [
        animate('1ms 225ms', style({ opacity: 1 })),
        animate('125ms'),
      ]),
    ]),

    trigger('clockwiseLine', [
      state('open', style({ transform: 'rotate(0)' })),
      state('close', style({ transform: 'rotate(45deg)' })),
      transition('open => close', animate('125ms 225ms')),
      transition('close => open', animate('125ms')),
    ]),

    trigger('counterClockwiseLine', [
      state('open', style({ transform: 'rotate(0)' })),
      state('close', style({ transform: 'rotate(-45deg) ' })),
      transition('open => close', animate('125ms 225ms')),
      transition('close => open', animate('125ms')),
    ]),

    trigger('bottomLine', [
      state('open', style({ transform: 'translateY(0)', opacity: 1 })),
      state('close', style({ transform: 'translateY(-6px) ', opacity: 0 })),
      transition(
        'open => close',
        animate('125ms', style({ transform: 'translateY(-6px)' }))
      ),
      transition('close => open', [
        animate('1ms 225ms', style({ opacity: 1 })),
        animate('125ms'),
      ]),
    ]),
  ],
})
export class NavTogglerIconComponent {
  @Input() shouldClose = true;

  checkIfTriggered() {
    return this.shouldClose ? 'close' : 'open';
  }
}
