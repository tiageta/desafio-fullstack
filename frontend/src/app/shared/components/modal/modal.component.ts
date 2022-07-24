import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ModalBodyObject,
  ModalOptions,
} from '../../models/modal-options.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() modalOptions: ModalOptions | undefined;

  constructor(public activeModel: NgbActiveModal) {}

  isBold(line: string | ModalBodyObject | undefined): boolean {
    if (typeof line === 'string') return false;
    return !!line?.options?.bold;
  }

  isString(line: string | ModalBodyObject | undefined): boolean {
    return typeof line === 'string';
  }

  getKey(line: string | ModalBodyObject | undefined): string {
    if (typeof line === 'string') return line;
    return `${line?.key}: ` ?? '';
  }

  getValue(line: string | ModalBodyObject | undefined): string {
    if (typeof line === 'string') return line;
    return line?.value ?? '';
  }
}
