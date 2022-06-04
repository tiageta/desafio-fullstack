import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
export class DashboardComponent {
  private _selectedVehicle = '';
  private _previousImg = '-';
  private _previousImgAlt = '-';

  hasSelectionChanged = false;
  hasImgLeft = false;

  set selectedVehicle(vehicle: string) {
    this._selectedVehicle = vehicle;
    if (!this.hasImgLeft) this.hasSelectionChanged = true; // triggers leave transition
  }

  get vehicleImgUrl(): string {
    if (this.hasSelectionChanged) return this._previousImg;

    const currentImg =
      this._selectedVehicle !== ''
        ? `assets/img/${this._selectedVehicle.replace(/\s/g, '')}.png`
        : '';
    this._previousImg = currentImg;
    return currentImg;
  }

  get vehicleImgAlt(): string {
    if (this.hasSelectionChanged) return this._previousImgAlt;

    const currentImgAlt = this._selectedVehicle.replace('-', '');
    this._previousImgAlt = currentImgAlt;
    return currentImgAlt;
  }

  afterLeave() {
    this.hasImgLeft = true; // triggers arrive transition
  }

  afterArrive() {
    this.hasImgLeft = false;
    this.hasSelectionChanged = false;
  }
}
