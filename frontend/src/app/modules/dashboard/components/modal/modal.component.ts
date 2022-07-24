import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOptions } from 'src/app/modules/dashboard/interfaces/modal-options.model';
import { VehicleData } from 'src/app/shared/models/vehicle.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() modalOptions: ModalOptions | undefined;

  isSuccess = false;
  isConfirmation = false;

  constructor(public activeModel: NgbActiveModal) {}

  ngOnInit(): void {
    this.isConfirmation = ['create', 'update', 'delete'].includes(
      this.modalOptions?.action ?? ''
    );

    this.isSuccess = ['created', 'updated', 'deleted'].includes(
      this.modalOptions?.action ?? ''
    );
  }

  isBold(key: string | undefined): boolean {
    if (!this.modalOptions?.bold || !key) return false;
    // Both modalOptions.body and .bold share the same keys of
    // a VehicleData object, so this type assertion is safe, as
    // key always comes from .body
    return !!this.modalOptions.bold[key as keyof VehicleData];
  }

  getKeys(data: VehicleData | undefined): string[] {
    return Object.keys(data ?? {});
  }

  getTitle(): string {
    if (this.isConfirmation) return 'Confirmação';
    else if (this.isSuccess) return 'Sucesso';
    else return 'Erro';
  }

  getLabel(key: string): string {
    switch (key) {
      case 'vin':
        return 'VIN';
      case 'odometer':
        return 'Odômetro';
      case 'fuelLevel':
        return 'Nível de Combustível';
      case 'vehicleStatus':
        return 'Status';
      case 'latitude':
        return 'Lat.';
      case 'longitude':
        return 'Long.';
      default:
        return '';
    }
  }

  getAction(): string {
    switch (this.modalOptions?.action) {
      case 'create':
        return 'criar';
      case 'update':
        return 'atualizar';
      case 'delete':
        return 'deletar';
      case 'created':
        return 'criados';
      case 'updated':
        return 'atualizados';
      case 'deleted':
        return 'deletados';
      default:
        return '';
    }
  }

  getValue(key: string): string {
    if (!this.modalOptions?.body || !key) return '';
    return this.modalOptions?.body[key as keyof VehicleData]?.toString() ?? '';
  }
}
