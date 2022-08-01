import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { Vehicle } from 'src/app/shared/models/vehicle.model';
import { DataCharts } from '../../interfaces/data-chart';

type HTMLElementRef = ElementRef<HTMLElement>;

@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.scss'],
})
export class DataChartsComponent implements AfterViewInit, OnChanges {
  private _chartRefsArray: HTMLElementRef[] | undefined;

  @ViewChildren('chartElements') chartElementsRef:
    | QueryList<HTMLElementRef>
    | undefined;
  @Input() selectedVehicle: Vehicle | undefined;

  haveChartsLoaded = false;

  charts: DataCharts = [
    {
      title: 'Conectados',
      legend: ['Connected', 'Not connected'],
      percent: '0.00%',
      getValue: this.getConnectedVehicles.bind(this),
      getTotal: this.getTotalSales.bind(this),
      getElement: this.getConnectedChartEl.bind(this),
    },
    {
      title: 'Update Software',
      legend: ['Software updated', 'Software not updated'],
      percent: '0.00%',
      getValue: this.getSoftwareVehicles.bind(this),
      getTotal: this.getTotalSales.bind(this),
      getElement: this.getSoftwareChartEl.bind(this),
    },
  ];

  ngAfterViewInit() {
    // Get chart template refs
    this._chartRefsArray = this.chartElementsRef?.toArray();
    // Load the Visualization API and the corechart package.
    google.charts.load('current', { packages: ['corechart'] });
    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(() => {
      setTimeout(this.drawCharts.bind(this), 1000);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.haveChartsLoaded && changes['selectedVehicle']) this.drawCharts();
  }

  // Callback that instantiates the pie chart,
  // passes in the data and draws it.
  drawCharts(): void {
    // Set chart options
    const options: google.visualization.PieChartOptions = {
      pieHole: 0.4,
      width: 224,
      pieSliceText: 'none',
      titleTextStyle: {
        fontName: 'sans-serif',
        bold: false,
        fontSize: 20,
      },
      tooltip: {
        trigger: 'none',
      },
      legend: 'none',
      colors: ['0d6efd', 'ccc'],
    };

    this.charts.forEach((chart) => {
      const element = chart.getElement();
      if (!element) return;

      chart.percent = this.getPercent(chart.getValue(), chart.getTotal());

      const data = new google.visualization.DataTable();
      data.addColumn('string');
      data.addColumn('number');
      data.addRows([
        [chart.legend[0], chart.getValue()],
        [chart.legend[1], chart.getTotal() - chart.getValue()],
      ]);

      new google.visualization.PieChart(element).draw(data, options);

      this.haveChartsLoaded = true;
    });
  }

  getConnectedVehicles() {
    return this.selectedVehicle?.connected ?? 0;
  }

  getSoftwareVehicles() {
    return this.selectedVehicle?.softwareUpdated ?? 0;
  }

  getTotalSales() {
    return this.selectedVehicle?.totalSales ?? 1; // necessary to print default empty chart
  }

  getPercent(value: number, total: number) {
    return `${((100 * value) / total).toFixed(2)}%`;
  }

  getConnectedChartEl() {
    // failed to get template ref
    if (!this._chartRefsArray) return;
    return this._chartRefsArray[0].nativeElement;
  }

  getSoftwareChartEl() {
    // failed to get template ref
    if (!this._chartRefsArray) return;
    return this._chartRefsArray[1].nativeElement;
  }
}
