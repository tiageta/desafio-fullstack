import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pluck } from 'rxjs';
import {
  Vehicles,
  VehiclesAPI,
  VehiclesData,
  VehiclesDataAPI,
} from 'src/app/shared/models/vehicle.model';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicles> {
    return this.http.get<VehiclesAPI>(`${API}/vehicle`).pipe(pluck('vehicles'));
  }

  getVehiclesData(vin?: string): Observable<VehiclesData> {
    return this.http.get<VehiclesDataAPI>(`${API}/vehicleData`).pipe(
      pluck('vehicleData'),
      map((vehiclesData) => {
        if (vin)
          return vehiclesData.filter((vehicleData) =>
            vehicleData.vin?.includes(vin)
          );
        return vehiclesData;
      })
    );
  }
}
