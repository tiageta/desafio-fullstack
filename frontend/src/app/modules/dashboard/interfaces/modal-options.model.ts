import { VehicleData } from 'src/app/shared/models/vehicle.model';

export type ModalOptions = {
  bold?: {
    [key in keyof VehicleData]?: boolean;
  };
} & {
  action:
    | 'create'
    | 'update'
    | 'delete'
    | 'created'
    | 'updated'
    | 'deleted'
    | 'error';
  body?: VehicleData;
};
