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
