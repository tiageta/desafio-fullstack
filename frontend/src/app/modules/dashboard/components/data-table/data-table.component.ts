import { animate, style, transition, trigger } from '@angular/animations';
import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  filter,
  finalize,
  map,
  Observable,
  Observer,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { DataModalComponent } from '../data-modal/data-modal.component';
import { ModalOptions } from '../../interfaces/modal-options.model';
import { VehicleData, VehiclesData } from 'src/app/shared/models/vehicle.model';
import { TableField, TableFields } from '../../interfaces/table-field';
import { VehiclesDataService } from '../../services/vehicles-data.service';

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
export class DataTableComponent implements OnInit {
  private _httpGetNotifier$ = new Subject<void>();
  private _matchedVehicleData: VehicleData = {};
  private _firstVehicleData: VehicleData = {};
  private _inputtedVin = '';
  private _isVinValid = false;
  private _hasVinMatched = false;

  get isVinValid() {
    return this._isVinValid;
  }

  isFetchingData = false;
  isLoadingTableData = false;
  isWaitingResponse = false;
  mayCreate = false;
  mayUpdate = false;
  mayDelete = false;

  searchedVin = new FormControl(
    { value: '', disabled: true },
    Validators.required
  );

  get isVinMinLength() {
    return this.searchedVin.value.length > 2;
  }

  @ViewChild('vinInput')
  vinInputElement: ElementRef | undefined;

  firstVehicleData$: Observable<VehicleData> = this.vehiclesDataService
    .getFirstVehicleData()
    .pipe(
      tap(() =>
        this.searchedVin.enable({
          onlySelf: true,
          emitEvent: false,
        })
      )
    );

  filteredVehiclesData$: Observable<VehiclesData> =
    this.searchedVin.valueChanges.pipe(
      debounceTime(INPUT_DEBOUNCE_MS),
      filter(
        (inputtedValue) =>
          this.isVinMinLength || inputtedValue.length < this._inputtedVin.length // _inputtedVin holds previous value; do not filter when erasing
      ),
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

        // Disables all buttons
        this.mayCreate = this.mayUpdate = this.mayDelete = false;

        // Clears table if vin not valid
        if (!this._isVinValid) {
          this._hasVinMatched = false;
          this.tableFields.forEach((field) => {
            if (!field.dirty) field.value = ''; // keeps altered values
          });
        }

        // Sets flags that triggers spinner in template
        this.isFetchingData = true;
        this.isLoadingTableData = this._isVinValid;
      }),
      switchMap((inputtedValue) =>
        this.vehiclesDataService.getVehiclesData(inputtedValue)
      ),
      tap((vehiclesData) => {
        this._hasVinMatched = vehiclesData.length === 1 && this._isVinValid;

        // Clears table if no match
        if (!this._hasVinMatched) {
          this._hasVinMatched = false;
          this.tableFields.forEach((field) => {
            if (!field.dirty) field.value = ''; // keeps altered values
          });
        }

        // Enables delete button
        this.mayDelete = this._hasVinMatched;

        // Enables create button
        this.mayCreate = this._isVinValid && !this._hasVinMatched;
        if (this.mayCreate) this.refreshCreateOptions();

        // Resets loading flags
        this.isFetchingData = false;
        this.isLoadingTableData = false;
      })
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

  createOptions: ModalOptions | undefined;
  updateOptions: ModalOptions | undefined;
  deleteOptions: ModalOptions | undefined;

  constructor(
    private vehiclesDataService: VehiclesDataService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // Get vehicle data of id=1 to populate dashboard on reload
    this.firstVehicleData$.subscribe((firstVehicleData) => {
      this._firstVehicleData = firstVehicleData;
      this.searchedVin.setValue(firstVehicleData.vin ?? '');
      this.searchedVin.updateValueAndValidity({
        onlySelf: true,
        emitEvent: true,
      });
    });

    // Populates table fields with filtered data
    this.filteredVehiclesData$.subscribe((filteredVehiclesData) => {
      if (filteredVehiclesData.length !== 1 || !this._hasVinMatched) return;
      this._matchedVehicleData = filteredVehiclesData[0];
      this.tableFields.forEach((field) => {
        if (!field.type) return;
        field.value = this._matchedVehicleData[field.type]?.toString() ?? '';
        field.dirty = false;
      });
      if (this.mayDelete) this.refreshDeleteOptions();
    });
  }

  private refreshVehiclesData() {
    // Triggers observable where all logic for flags is implemented
    this.searchedVin.updateValueAndValidity({
      onlySelf: true,
      emitEvent: true,
    });
  }

  handleDirtyField(tableField: TableField): void {
    const originalValue = tableField.type
      ? this._matchedVehicleData[tableField.type]
      : undefined;
    tableField.dirty = this.getFieldValue(tableField.type) !== originalValue;

    this.mayUpdate = this._hasVinMatched && this.isAnyFieldDirty(); // Enables update button
    this.refreshCreateOptions();
    this.refreshUpdateOptions();
  }

  isAnyFieldDirty(): boolean {
    return this.tableFields.some((field) => field.dirty);
  }

  refreshCreateOptions(): void {
    this.createOptions = {
      action: 'create',
      body: {
        vin: this._inputtedVin,
        odometer: this.getFieldValue('odometer'),
        fuelLevel: this.getFieldValue('fuelLevel'),
        vehicleStatus: this.getFieldValue('vehicleStatus'),
        latitude: this.getFieldValue('latitude'),
        longitude: this.getFieldValue('longitude'),
      },
    };
  }

  refreshUpdateOptions(): void {
    this.updateOptions = {
      action: 'update',
      body: {
        vin: this._matchedVehicleData.vin ?? '',
        odometer: this.getFieldValue('odometer'),
        fuelLevel: this.getFieldValue('fuelLevel'),
        vehicleStatus: this.getFieldValue('vehicleStatus'),
        latitude: this.getFieldValue('latitude'),
        longitude: this.getFieldValue('longitude'),
      },
      bold: {
        odometer: this.isFieldDirty('odometer'),
        fuelLevel: this.isFieldDirty('fuelLevel'),
        vehicleStatus: this.isFieldDirty('vehicleStatus'),
        latitude: this.isFieldDirty('latitude'),
        longitude: this.isFieldDirty('longitude'),
      },
    };
  }

  refreshDeleteOptions(): void {
    this.deleteOptions = {
      action: 'delete',
      body: {
        vin: this._matchedVehicleData.vin ?? '',
        odometer: this._matchedVehicleData.odometer ?? '',
        fuelLevel: this._matchedVehicleData.fuelLevel ?? '',
        vehicleStatus: this._matchedVehicleData.vehicleStatus ?? '',
        latitude: this._matchedVehicleData.latitude ?? '',
        longitude: this._matchedVehicleData.longitude ?? '',
      },
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
    const modalOptions = [
      this.createOptions,
      this.updateOptions,
      this.deleteOptions,
    ].find((options) => options?.action === method);

    if (!modalOptions) return;

    const modalRef = this.modalService.open(DataModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.modalOptions = modalOptions;
    modalRef.result.then(
      () => {
        this.isWaitingResponse = true;
        if (Object.is(modalOptions, this.createOptions)) this.createHandle();
        else if (Object.is(modalOptions, this.updateOptions))
          this.updateHandle();
        else this.deleteHandle(); // already returned if neither above
      },
      () => {} // lib throws an error if onreject is omitted; handles modal dismiss
    );
  }

  createHandle(): void {
    const newVehicleData = this.createOptions?.body ?? {};
    this.vehiclesDataService
      .createVehicleData(newVehicleData)
      .pipe(finalize(() => (this.isWaitingResponse = false)))
      .subscribe(this.httpHandle('created'));
  }

  updateHandle() {
    const updatedVehicleData = this.updateOptions?.body ?? {};
    if (!updatedVehicleData.vin) return;
    this.vehiclesDataService
      .updateVehicleData(updatedVehicleData.vin, updatedVehicleData)
      .then((observable) =>
        observable
          .pipe(finalize(() => (this.isWaitingResponse = false)))
          .subscribe(this.httpHandle('updated'))
      )
      .catch(() => this.errorHandle());
  }

  deleteHandle() {
    const deletedVehicleData = this.deleteOptions?.body ?? {};
    if (!deletedVehicleData.vin) return;
    this.vehiclesDataService
      .deleteVehicleData(deletedVehicleData.vin)
      .then((observable) =>
        observable
          .pipe(finalize(() => (this.isWaitingResponse = false)))
          .subscribe(this.httpHandle('deleted'))
      )
      .catch(() => this.errorHandle());
  }

  httpHandle(action: string): Partial<Observer<HttpResponse<VehicleData>>> {
    return {
      complete: () => {
        const modalRef = this.modalService.open(DataModalComponent, {
          centered: true,
        });
        modalRef.componentInstance.modalOptions = { action };
        this.refreshVehiclesData();
      },
      error: () => this.errorHandle(),
    };
  }

  errorHandle(): void {
    this.isWaitingResponse = false;
    const modalRef = this.modalService.open(DataModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.modalOptions = { action: 'error' };
  }
}
