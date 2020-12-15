import { DashboardCell } from './dashboard-cell';

export class DashboardRow {
  constructor(columsCount?: number) {
    columsCount = columsCount || 1;
    for (let index = 0; index < columsCount; index++) {
      this.cells.push(new DashboardCell(12 / columsCount));
    }
  }
  cells: DashboardCell[] = [];
}
