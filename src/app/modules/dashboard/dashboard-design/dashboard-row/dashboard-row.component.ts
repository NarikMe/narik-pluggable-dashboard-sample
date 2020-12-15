import { DashboardRow } from "./../../dashboard-share/base/dashboard-row";
import {
  CommandHost,
  CommandInfo,
  DialogService,
  DialogResult
} from "@narik/infrastructure";
import {
  Component,
  Input,
  OnInit,
  HostListener,
  Output,
  EventEmitter
} from "@angular/core";

import { DashboardCell } from "../../dashboard-share/base/dashboard-cell";
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: "dashboard-row",
  templateUrl: "dashboard-row.component.html",
  styleUrls: ["dashboard-row.component.css"]
})
export class DashboardRowComponent implements OnInit, CommandHost {
  change$: Observable<any>;

  @Input()
  row: DashboardRow = new DashboardRow();

  @Output()
  removeRequest: EventEmitter<DashboardRow> = new EventEmitter<DashboardRow>();

  isMouseOver = false;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {}

  processCommand(cmd: CommandInfo) {
    if (cmd.commandKey === "add") {
      const sumSize = this.row.cells
        .map(c => c.size)
        .reduce((a, b) => a + b, 0);
      if (sumSize < 12) {
        this.row.cells.push(new DashboardCell(12 - sumSize));
      } else {
        this.dialogService.error("dashboard.row-size-is-full");
      }
    } else if (cmd.commandKey === "remove") {
      this.dialogService
        .showConfirm("dashboard.confirm-remove-row", "Confirm")
        .closed.then((result: DialogResult<any>) => {
          if (result.dialogResult === "yes") {
            this.removeRequest.emit(this.row);
          }
        });
    }
  }

  removeCell(cell) {
    if (this.row.cells.length > 1) {
      const pos = this.row.cells.indexOf(cell);
      if (pos >= 0) {
        this.row.cells.splice(pos, 1);
      }
    } else {
      this.dialogService.error("dashboard.row-cell-could-not-empty");
    }
  }
}
