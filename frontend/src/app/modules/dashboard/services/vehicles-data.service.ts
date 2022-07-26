import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { VehicleData, VehiclesData } from 'src/app/shared/models/vehicle.model';
import { environment } from 'src/environments/environment';

const API = environment.API_URL;

interface VehiclesDataResponse {
  data: VehiclesData;
}

interface VehicleDataResponse {
  data: VehicleData;
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

  getFirstVehicleData() {
    return this.http.get<VehicleDataResponse>(`${API}/vehiclesData/1`).pipe(
      map((response: VehicleDataResponse) => response.data) // pluck is deprecated
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
    try {
      const vehiclesData = await firstValueFrom(this.getVehiclesData(vin));
      if (vehiclesData.length !== 1) throw 'VIN does not match a record.';

      const id = vehiclesData[0].id;
      return this.http.patch(`${API}/vehiclesData/${id}`, newValues, {
        observe: 'response',
      });
    } catch (err) {
      throw err;
    }
  }

  async deleteVehicleData(
    vin: string
  ): Promise<Observable<HttpResponse<VehicleData>>> {
    try {
      const vehiclesData = await firstValueFrom(this.getVehiclesData(vin));
      if (vehiclesData.length !== 1) throw 'VIN does not match a record.';

      const id = vehiclesData[0].id;
      return this.http.delete(`${API}/vehiclesData/${id}`, {
        observe: 'response',
      });
    } catch (err) {
      throw err;
    }
  }
}
