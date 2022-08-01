import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Vehicle } from 'src/app/shared/models/vehicle.model';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.scss'],
  animations: [
    trigger('imageLeave', [
      state('true', style({ transform: 'translateX(10%)', opacity: 0 })),
      state('false', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('false => true', animate(150)),
    ]),

    trigger('imageArrive', [
      state('true', style({ transform: 'translateX(-10%)', opacity: 0 })),
      state('false', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('true => false', animate(150)),
    ]),
  ],
})
export class CarImageComponent implements OnChanges {
  private _previousImgUrl = '';
  private _previousImgAlt = '';

  @Input() selectedVehicle: Vehicle | undefined;

  hasSelectionChanged = false;
  hasImgLeft = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedVehicle']) this.hasSelectionChanged = true; // triggers leave transition
  }
  triggerLeave(): boolean {
    return !this.hasImgLeft && this.hasSelectionChanged;
  }
  afterLeave() {
    this.hasImgLeft = true; // triggers arrive transition
  }

  triggerArrive(): boolean {
    return this.hasImgLeft && this.hasSelectionChanged;
  }
  afterArrive() {
    this.hasImgLeft = false;
    this.hasSelectionChanged = false;
  }

  get vehicleImgUrl(): string {
    if (!this.selectedVehicle) return '';
    if (this.hasSelectionChanged) return this._previousImgUrl;

    const _vehicleImgUrl =
      this.selectedVehicle.model !== ''
        ? `assets/img/${this.selectedVehicle.model.replace(/\s/g, '')}.png`
        : '';
    this._previousImgUrl = _vehicleImgUrl;
    return _vehicleImgUrl;
  }

  get vehicleImgAlt(): string {
    if (!this.selectedVehicle) return '';
    if (this.hasSelectionChanged) return this._previousImgAlt;

    const _vehicleImgAlt = this.selectedVehicle.model ?? '';
    this._previousImgAlt = _vehicleImgAlt;
    return _vehicleImgAlt;
  }
}
