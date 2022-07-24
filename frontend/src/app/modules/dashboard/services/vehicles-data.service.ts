import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, take, tap } from 'rxjs';
import { VehicleData, VehiclesData } from 'src/app/shared/models/vehicle.model';
import { environment } from 'src/environments/environment';

const API = environment.API_URL;

interface VehiclesDataResponse {
  data: VehiclesData;
}

@Injectable({
  providedIn: 'root',
})
export class VehiclesDataService {
  constructor(private http: HttpClient) {}

  getVehiclesData(vin?: string): Observable<VehiclesData> {
    return this.http.get<VehiclesDataResponse>(`${API}/vehiclesData`).pipe(
      map((response: VehiclesDataResponse) => response.data), // pluck is deprecated
      map((vehiclesData) => {
        if (vin)
          return vehiclesData.filter((vehicleData) =>
            vehicleData.vin?.includes(vin)
          );
        return vehiclesData;
      })
    );
  }

  createVehicleData(
    vehicleData: VehicleData
  ): Observable<HttpResponse<VehicleData>> {
    return this.http.post(`${API}/vehiclesData`, vehicleData, {
      observe: 'response',
    });
  }

  async updateVehicleData(
    vin: string,
    newValues: VehicleData
  ): Promise<Observable<HttpResponse<VehicleData>>> {
    const [vehicleData] = await firstValueFrom(this.getVehiclesData(vin));
    const id = vehicleData.id;
    return this.http.post(`${API}/vehiclesData/${id}`, newValues, {
      observe: 'response',
    });
  }

  async deleteVehicleData(
    vin: string
  ): Promise<Observable<HttpResponse<VehicleData>>> {
    const [vehicleData] = await firstValueFrom(this.getVehiclesData(vin));
    const id = vehicleData.id;
    return this.http.delete(`${API}/vehiclesData/${id}`, {
      observe: 'response',
    });
  }
}
