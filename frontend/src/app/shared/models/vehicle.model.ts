export interface Vehicle {
  id: number;
  model: string;
  totalSales: number;
  connected: number;
  softwareUpdated: number;
}

export type Vehicles = Vehicle[];

export interface VehicleData {
  id: number;
  vin: string;
  odometer: string;
  tirePressure: string;
  vehicleStatus: string;
  batteryStatus: string;
  fuelLevel: string;
  latitude: string;
  longitude: string;
}

export type VehiclesData = VehicleData[];
