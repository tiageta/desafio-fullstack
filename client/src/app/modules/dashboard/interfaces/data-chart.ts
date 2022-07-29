export interface DataChart {
  title: string;
  legend: string[];
  percent: string;
  getValue(): number;
  getTotal(): number;
  getElement(): HTMLElement | undefined;
}

export type DataCharts = DataChart[];
