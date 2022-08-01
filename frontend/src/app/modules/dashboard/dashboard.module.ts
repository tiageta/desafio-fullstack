import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataCardsComponent } from './components/data-cards/data-cards.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { DataChartsComponent } from './components/data-charts/data-charts.component';
import { DataModalComponent } from './components/data-modal/data-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DataTableComponent,
    DataCardsComponent,
    CarImageComponent,
    DataChartsComponent,
    DataModalComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
