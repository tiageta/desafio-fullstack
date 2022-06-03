import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  VehiclesAPI,
  VehiclesDataAPI,
} from 'src/app/shared/models/vehicle.model';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  getVehicles(): Observable<VehiclesAPI> {
    return this.http.get<VehiclesAPI>(`${API}/vehicle`);
  }

  getVehicleData(vinCode: string): Observable<VehiclesDataAPI> {
    return this.http.get<VehiclesDataAPI>(`${API}/vehicleData`);
  }
}
