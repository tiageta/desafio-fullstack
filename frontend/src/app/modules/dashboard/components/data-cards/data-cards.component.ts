import { Component, Output, EventEmitter } from '@angular/core';
import { Vehicle, Vehicles } from 'src/app/shared/models/vehicle.model';
import { DataCards } from '../../interfaces/data-card';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-data-cards',
  templateUrl: './data-cards.component.html',
  styleUrls: ['./data-cards.component.scss'],
})
export class DataCardsComponent {
  @Output() selectVehicleEvent = new EventEmitter<string>();
  selectedVehicle = '-';

  vehicles$ = this.vehiclesService.getVehicles();

  dataCards: DataCards = [
    { header: 'Total de Vendas', callback: this.getTotalSales.bind(this) },
    { header: 'Conectados', callback: this.getConnected.bind(this) },
    { header: 'Update Software', callback: this.getSoftwareUpdate.bind(this) },
  ];

  constructor(private vehiclesService: VehiclesService) {}

  private findSelectedVehicle(vehicles: Vehicles): Vehicle | undefined {
    return vehicles.find((v) => v.vehicle === this.selectedVehicle);
  }

  getTotalSales(vehicles: Vehicles): number | string {
    return this.findSelectedVehicle(vehicles)?.volumetotal ?? '-';
  }

  getConnected(vehicles: Vehicles): number | string {
    return this.findSelectedVehicle(vehicles)?.connected ?? '-';
  }

  getSoftwareUpdate(vehicles: Vehicles): number | string {
    return this.findSelectedVehicle(vehicles)?.softwareUpdates ?? '-';
  }
}
