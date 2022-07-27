import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Vehicles, VehiclesData } from 'src/app/shared/models/vehicle.model';
import { environment } from 'src/environments/environment';

const API = environment.API_URL;

interface VehiclesResponse {
  data: Vehicles;
}

interface VehiclesDataResponse {
  data: VehiclesData;
}

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicles> {
    return this.http
      .get<VehiclesResponse>(`${API}/vehicles`)
      .pipe(map((response: VehiclesResponse) => response.data)); // pluck is deprecated
  }

  getVehiclesData(vin?: string): Observable<VehiclesData> {
    return this.http.get<VehiclesDataResponse>(`${API}/vehiclesData`).pipe(
      map((response: VehiclesDataResponse) => response.data), // pluck is deprecated
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
