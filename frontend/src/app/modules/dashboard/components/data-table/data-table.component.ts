import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  map,
  merge,
  Observable,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import {
  ModalBodyObject,
  ModalOptions,
} from 'src/app/shared/models/modal-options.model';
import { VehicleData, VehiclesData } from 'src/app/shared/models/vehicle.model';
import { TableField, TableFields } from '../../interfaces/table-field';
import { VehiclesService } from '../../services/vehicles.service';

const VIN_LENGTH = 20;
const INPUT_DEBOUNCE_MS = 200;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [
    trigger('delaySpinner', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms 250ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DataTableComponent implements OnInit, OnDestroy {
  private _allVehiclesData: VehiclesData = [];
  private _allVehiclesDataSub = new Subscription();
  private _filteredVehicleData: VehicleData = {};
  private _filteredVehicleDataSub = new Subscription();
  private _inputtedVin = '';
  private _isVinValid = false;
  private _hasVinMatched = false;

  isLoadingTableData = false;
  mayCreate = false;
  mayUpdate = false;
  mayDelete = false;

  searchedVin = new FormControl(
    { value: '', disabled: true },
    Validators.required
  );

  @ViewChild('vinInput')
  vinInputElement: ElementRef | undefined;

  allVehiclesData$: Observable<VehiclesData> =
    this.vehiclesService.getVehiclesData();

  filteredVehiclesData$: Observable<VehiclesData> =
    this.searchedVin.valueChanges.pipe(
      debounceTime(INPUT_DEBOUNCE_MS),
      map((inputtedValue: string) => {
        // Converts value to uppercase in forms
        const upperCaseInputtedValue = inputtedValue.toUpperCase();
        this.searchedVin.setValue(upperCaseInputtedValue, {
          emitEvent: false,
        });
        return upperCaseInputtedValue;
      }),
      tap((inputtedValue) => {
        // Store variables locally as to not depend on input value later in pipe
        this._inputtedVin = inputtedValue;
        this._isVinValid = inputtedValue.length === VIN_LENGTH;
        this._hasVinMatched =
          this._isVinValid && this.vinMatchVehicleData(inputtedValue);

        // Disables all buttons
        this.mayCreate = this.mayUpdate = this.mayDelete = false;

        // Clears table if no match
        if (!this._hasVinMatched) {
          this.tableFields.forEach((field) => {
            if (!field.dirty) field.value = ''; // keeps altered values
          });
        }

        // Unfocus input field as to not popup datalist on data load
        if (this._hasVinMatched && this.vinInputElement) {
          this.vinInputElement.nativeElement.blur();
        }

        // Sets flag that triggers spinner in template
        this.isLoadingTableData =
          this._hasVinMatched || (!this._hasVinMatched && this._isVinValid);
      }),
      switchMap((inputtedValue) =>
        this.vehiclesService.getVehiclesData(inputtedValue)
      ),
      tap(() => {
        // Enables delete button
        this.mayDelete = this._hasVinMatched;

        // Enables create button
        this.mayCreate = this._isVinValid && !this._hasVinMatched;
        if (this.mayCreate) this.refreshCreateOptions();

        // Controls final state of loading flag
        this.isLoadingTableData = false;
      })
    );

  vehiclesData$: Observable<VehiclesData> = merge(
    this.allVehiclesData$,
    this.filteredVehiclesData$
  ).pipe(
    tap(() =>
      this.searchedVin.enable({
        onlySelf: true,
        emitEvent: false,
      })
    )
  );

  tableFields: TableFields = [
    { header: 'Código - Vin' },
    { header: 'Odômetro', type: 'odometer', value: '', unit: ' km' },
    {
      header: 'Nível de Combustível',
      type: 'fuelLevel',
      value: '',
      unit: ' %',
    },
    { header: 'Status', type: 'vehicleStatus', value: '' },
    { header: 'Lat.', type: 'latitude', value: '' },
    { header: 'Long.', type: 'longitude', value: '' },
  ];

  modalOptions: ModalOptions = {
    title: 'Confirmação',
    primary: 'Sim',
    secondary: 'Não',
  };
  createOptions: ModalOptions | undefined;
  updateOptions: ModalOptions | undefined;
  deleteOptions: ModalOptions | undefined;

  constructor(
    private vehiclesService: VehiclesService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this._allVehiclesDataSub = this.allVehiclesData$.subscribe(
      (allVehiclesData) => (this._allVehiclesData = allVehiclesData)
    );

    // Populates table fields with filtered data
    this._filteredVehicleDataSub = this.filteredVehiclesData$.subscribe(
      (filteredVehiclesData) => {
        if (filteredVehiclesData.length !== 1) return;
        this._filteredVehicleData = filteredVehiclesData[0];
        this.tableFields.forEach((field) => {
          if (!field.type) return;
          field.value = this._filteredVehicleData[field.type]?.toString() ?? '';
          field.dirty = false;
        });
        if (this.mayDelete) this.refreshDeleteOptions();
      }
    );
  }

  ngOnDestroy(): void {
    this._allVehiclesDataSub.unsubscribe();
    this._filteredVehicleDataSub.unsubscribe();
  }

  vinMatchVehicleData(vin: string): boolean {
    return !!this._allVehiclesData.find(
      // redundancy check to uppercase, already handled in pipe
      (vehicleData) => vehicleData.vin?.toUpperCase() === vin.toUpperCase()
    );
  }

  handleDirtyField(tableField: TableField) {
    tableField.dirty = true;
    if (this._hasVinMatched) this.mayUpdate = true; // Enables update button
    this.refreshCreateOptions();
    this.refreshUpdateOptions();
  }

  refreshCreateOptions(): void {
    this.createOptions = {
      ...this.modalOptions,
      body: [
        'Você tem certeza que deseja criar o item:',
        { key: 'VIN', value: this._inputtedVin } as ModalBodyObject,
        {
          key: 'Odômetro',
          value: this.getFieldValue('odometer'),
        } as ModalBodyObject,
        {
          key: 'Nível de Combustível',
          value: this.getFieldValue('fuelLevel'),
        } as ModalBodyObject,
        {
          key: 'Status',
          value: this.getFieldValue('vehicleStatus'),
        } as ModalBodyObject,
        {
          key: 'Lat.',
          value: this.getFieldValue('latitude'),
        } as ModalBodyObject,
        {
          key: 'Long.',
          value: this.getFieldValue('longitude'),
        } as ModalBodyObject,
      ],
    };
  }

  refreshUpdateOptions(): void {
    this.updateOptions = {
      ...this.modalOptions,
      body: [
        'Você tem certeza que deseja atualizar o item:',
        { key: 'VIN', value: this._filteredVehicleData.vin } as ModalBodyObject,
        {
          key: 'Odômetro',
          value: this.getFieldValue('odometer'),
          options: { bold: this.isFieldDirty('odometer') },
        } as ModalBodyObject,
        {
          key: 'Nível de Combustível',
          value: this.getFieldValue('fuelLevel'),
          options: { bold: this.isFieldDirty('fuelLevel') },
        } as ModalBodyObject,
        {
          key: 'Status',
          value: this.getFieldValue('vehicleStatus'),
          options: { bold: this.isFieldDirty('vehicleStatus') },
        } as ModalBodyObject,
        {
          key: 'Lat.',
          value: this.getFieldValue('latitude'),
          options: { bold: this.isFieldDirty('latitude') },
        } as ModalBodyObject,
        {
          key: 'Long.',
          value: this.getFieldValue('longitude'),
          options: { bold: this.isFieldDirty('longitude') },
        } as ModalBodyObject,
      ],
    };
  }

  refreshDeleteOptions(): void {
    this.deleteOptions = {
      ...this.modalOptions,
      body: [
        'Você tem certeza que deseja deletar o item:',
        { key: 'VIN', value: this._filteredVehicleData.vin } as ModalBodyObject,
        {
          key: 'Odômetro',
          value: this._filteredVehicleData.odometer ?? '',
        } as ModalBodyObject,
        {
          key: 'Nível de Combustível',
          value: this._filteredVehicleData.fuelLevel ?? '',
        } as ModalBodyObject,
        {
          key: 'Status',
          value: this._filteredVehicleData.vehicleStatus ?? '',
        } as ModalBodyObject,
        {
          key: 'Lat.',
          value: this._filteredVehicleData.latitude ?? '',
        } as ModalBodyObject,
        {
          key: 'Long.',
          value: this._filteredVehicleData.longitude ?? '',
        } as ModalBodyObject,
      ],
    };
  }

  getFieldValue(type: TableField['type']): string {
    return this.tableFields.find((field) => field.type === type)?.value ?? '';
  }

  isFieldDirty(type: TableField['type']): boolean {
    const tableField = this.tableFields.find((field) => field.type === type);
    if (!tableField) return false;
    return !!tableField.dirty;
  }

  openModal(method: 'create' | 'update' | 'delete'): void {
    const modalOptions =
      method === 'create'
        ? this.createOptions
        : method === 'update'
        ? this.updateOptions
        : method === 'delete'
        ? this.deleteOptions
        : undefined;

    if (!modalOptions) return;

    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.modalOptions = modalOptions;
  }
}
