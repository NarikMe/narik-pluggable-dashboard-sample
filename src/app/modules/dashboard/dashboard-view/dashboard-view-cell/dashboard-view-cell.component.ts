import { DashboardCell } from './../../dashboard-share/base/dashboard-cell';
import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'dashboard-view-cell',
  templateUrl: 'dashboard-view-cell.component.html',
  styleUrls: ['dashboard-view-cell.component.css'],
})
export class DashboardViewCellComponent implements OnInit {
  @Input()
  cell: DashboardCell = new DashboardCell();

  @HostBinding('class')
  classItems = '';

  _size: number;
  @Input()
  set size(value: number) {
    this._size = value;
    this.classItems =
      DashboardCell.colClasses
        .map((x) => {
          return x + this.size.toString();
        })
        .join(' ') + ' mt-1  mt-md-0';
  }
  get size(): number {
    return this._size;
  }

  constructor() {}

  ngOnInit() {}
}
