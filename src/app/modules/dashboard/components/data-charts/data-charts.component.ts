import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Vehicle } from 'src/app/shared/models/vehicle.model';

@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.scss'],
})
export class DataChartsComponent implements AfterViewInit, OnChanges {
  private connectedData: google.visualization.DataTable | undefined;
  private softwareData: google.visualization.DataTable | undefined;
  private options: google.visualization.PieChartOptions | undefined;

  @ViewChild('connectedChart') connectedChart: ElementRef | undefined;
  @ViewChild('softwareChart') softwareChart: ElementRef | undefined;
  @Input() selectedVehicle: Vehicle | undefined;

  haveChartsLoaded = false;
  percentConnected = '0.00%';
  percentSoftware = '0.00%';

  ngAfterViewInit() {
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

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  drawCharts(): void {
    const totalSales = this.selectedVehicle?.totalSales ?? 1; // necessary to print default empty chart
    const connected = this.selectedVehicle?.connected ?? 0;
    const softwareUpdated = this.selectedVehicle?.softwareUpdated ?? 0;

    this.percentConnected = `${((100 * connected) / totalSales).toFixed(2)}%`;
    this.percentSoftware = `${((100 * softwareUpdated) / totalSales).toFixed(
      2
    )}%`;

    // Create the data tables
    this.connectedData = new google.visualization.DataTable();
    this.connectedData.addColumn('string');
    this.connectedData.addColumn('number');
    this.connectedData.addRows([
      ['Connected', connected],
      ['Not connected', totalSales - connected],
    ]);

    this.softwareData = new google.visualization.DataTable();
    this.softwareData.addColumn('string');
    this.softwareData.addColumn('number');
    this.softwareData.addRows([
      ['Software updated', softwareUpdated],
      ['Software not updated', totalSales - softwareUpdated],
    ]);

    // Set chart options
    this.options = {
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

    // Instantiate and draw our chart, passing in some options.
    if (this.connectedData && this.options && this.connectedChart) {
      new google.visualization.PieChart(this.connectedChart.nativeElement).draw(
        this.connectedData,
        this.options
      );
    }
    if (this.softwareData && this.options && this.softwareChart) {
      new google.visualization.PieChart(this.softwareChart.nativeElement).draw(
        this.softwareData,
        this.options
      );
    }
    this.haveChartsLoaded = true;
  }
}
