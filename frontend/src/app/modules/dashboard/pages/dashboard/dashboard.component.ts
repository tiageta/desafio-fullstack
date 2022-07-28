import { Component } from '@angular/core';
import { Vehicle } from 'src/app/shared/models/vehicle.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  selectedVehicle: Vehicle | undefined;

  selectVehicle(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
  }
}
