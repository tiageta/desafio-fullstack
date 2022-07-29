import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Vehicle, Vehicles } from 'src/app/shared/models/vehicle.model';
import { DataCards } from '../../interfaces/data-card';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-data-cards',
  templateUrl: './data-cards.component.html',
  styleUrls: ['./data-cards.component.scss'],
})
export class DataCardsComponent implements OnInit {
  @Output() selectVehicleEvent = new EventEmitter<Vehicle>();
  selectedVehicle = '';

  vehicles$ = this.vehiclesService.getVehicles();

  dataCards: DataCards = [
    { header: 'Total de Vendas', callback: this.getTotalSales.bind(this) },
    { header: 'Conectados', callback: this.getConnected.bind(this) },
    { header: 'Update Software', callback: this.getSoftwareUpdate.bind(this) },
  ];

  constructor(private vehiclesService: VehiclesService) {}

  ngOnInit(): void {
    this.vehicles$.subscribe((vehicles) => {
      this.selectedVehicle = vehicles[0]?.model ?? '';
      this.emitSelectedVehicle(vehicles);
    });
  }

  private findSelectedVehicle(vehicles: Vehicles): Vehicle | undefined {
    return vehicles.find((vehicle) => vehicle.model === this.selectedVehicle);
  }

  emitSelectedVehicle(vehicles: Vehicles | null): void {
    if (vehicles)
      this.selectVehicleEvent.emit(this.findSelectedVehicle(vehicles));
  }

  getTotalSales(vehicles: Vehicles): number | string {
    return this.findSelectedVehicle(vehicles)?.totalSales ?? '-';
  }

  getConnected(vehicles: Vehicles): number | string {
    return this.findSelectedVehicle(vehicles)?.connected ?? '-';
  }

  getSoftwareUpdate(vehicles: Vehicles): number | string {
    return this.findSelectedVehicle(vehicles)?.softwareUpdated ?? '-';
  }
}
