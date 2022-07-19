import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Vehicles, VehiclesData } from 'src/app/shared/models/vehicle.model';
import { environment } from 'src/environments/environment';

const API = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicles> {
    return this.http.get<Vehicles>(`${API}/vehicles`);
  }

  getVehiclesData(vin?: string): Observable<VehiclesData> {
    return this.http.get<VehiclesData>(`${API}/vehiclesData`).pipe(
      map((vehiclesData) => {
        if (vin)
          return vehiclesData.filter((vehicleData) =>
            vehicleData.vin.includes(vin)
          );
        return vehiclesData;
      })
    );
  }
}
