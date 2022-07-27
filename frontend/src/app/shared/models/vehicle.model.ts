export interface Vehicles extends Array<Vehicle> {}

export interface Vehicle {
  id: number | string;
  vehicle: string;
  volumetotal: number | string;
  connected: number | string;
  softwareUpdates: number | string;
}

export interface VehiclesAPI {
  vehicles: Vehicles;
}

export interface VehicleData {
  id: number | string;
  vin: string;
  odometer: number | string;
  fuelLevel: number | string;
  status: string;
  lat: number | string;
  long: number | string;
  tirePressure: string;
  batteryStatus: string;
}

export interface VehiclesData extends Array<VehicleData> {}

export interface VehiclesDataAPI {
  vehicleData: VehiclesData;
}
