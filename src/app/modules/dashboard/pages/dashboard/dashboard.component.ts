import { animate, query, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  selectedVehicle = '';

  selectVehicle(vehicle: string) {
    this.selectedVehicle = vehicle;
  }
}
