import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  merge,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { VehiclesData } from 'src/app/shared/models/vehicle.model';
import { TableField, TableFields } from '../../interfaces/table-field';
import { VehiclesService } from '../../services/vehicles.service';

const MIN_CHAR_TRIGGER = 4;
const INPUT_DEBOUNCE_MS = 200;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  searchedVin = new FormControl(
    { value: '', disabled: true },
    Validators.required
  );

  allVehiclesData$ = this.vehiclesService.getVehiclesData();
  filteredVehiclesData$: Observable<VehiclesData> =
    this.searchedVin.valueChanges.pipe(
      debounceTime(INPUT_DEBOUNCE_MS),
      filter(
        (inputtedValue) =>
          inputtedValue.length >= MIN_CHAR_TRIGGER || !inputtedValue.length
      ),
      distinctUntilChanged(),
      switchMap((inputtedValue) =>
        this.vehiclesService.getVehiclesData(inputtedValue)
      ),
      tap(console.log)
    );
  vehiclesData$ = merge(this.allVehiclesData$, this.filteredVehiclesData$).pipe(
    tap(() =>
      this.searchedVin.enable({
        onlySelf: true,
        emitEvent: false,
      })
    )
  );

  tableFields: TableFields = [
    { header: 'Código - Vin' },
    { header: 'Odômetro', data: 'odometer' },
    { header: 'Nível de Combustível', data: 'fuelLevel' },
    { header: 'Status', data: 'status' },
    { header: 'Lat.', data: 'lat' },
    { header: 'Long.', data: 'long' },
  ];

  constructor(private vehiclesService: VehiclesService) {}

  getDataFromVehicle(data: TableField['data'], vehiclesData: VehiclesData) {
    if (!data || vehiclesData.length !== 1) return ''; // still no match
    return vehiclesData[0][data];
  }
}
