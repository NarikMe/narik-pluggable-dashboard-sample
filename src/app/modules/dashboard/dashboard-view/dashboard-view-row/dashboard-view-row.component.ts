import { DashboardRow } from "./../../dashboard-share/base/dashboard-row";

import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "dashboard-view-row",
  templateUrl: "dashboard-view-row.component.html",
  styleUrls: ["dashboard-view-row.component.css"]
})
export class DashboardViewRowComponent implements OnInit {
  @Input()
  row: DashboardRow = new DashboardRow();

  ngOnInit() {}
}
