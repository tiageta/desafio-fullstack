import { Vehicles } from 'src/app/shared/models/vehicle.model';

export interface DataCard {
  header: string;
  callback(vehicles: Vehicles): number | string;
}

export type DataCards = DataCard[];
