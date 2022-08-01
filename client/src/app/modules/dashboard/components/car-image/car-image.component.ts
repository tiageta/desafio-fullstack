import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle, Vehicles } from 'src/app/shared/models/vehicle.model';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.scss'],
  animations: [
    trigger('imageTransition', [
      transition(':enter', [
        style({ transform: 'translateX(-10%)', opacity: 0 }),
        animate(150, style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate(150, style({ transform: 'translateX(10%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class CarImageComponent {
  @Input() selectedVehicle: Vehicle | undefined;

  vehicles$: Observable<Vehicles> = this.vehiclesService.getVehicles();

  constructor(private vehiclesService: VehiclesService) {}

  isVehicleSelected(vehicle: Vehicle): boolean {
    return vehicle.model === this.selectedVehicle?.model;
  }

  getVehicleImgUrl(vehicle: Vehicle): string {
    if (!vehicle.model) return '';
    return `assets/img/${vehicle.model.replace(/\s/g, '')}.png`;
  }

  getVehicleImgAlt(vehicle: Vehicle): string {
    if (!vehicle.model) return '';
    return vehicle.model;
  }
}
