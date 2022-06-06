import { VehicleData } from 'src/app/shared/models/vehicle.model';

export interface TableField {
  header: string;
  data?: keyof VehicleData;
  unit?: string;
}

export type TableFields = TableField[];
