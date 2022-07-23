import { VehicleData } from 'src/app/shared/models/vehicle.model';

export interface TableField {
  header: string;
  type?: keyof VehicleData;
  unit?: string;
  value?: string;
}

export type TableFields = TableField[];
