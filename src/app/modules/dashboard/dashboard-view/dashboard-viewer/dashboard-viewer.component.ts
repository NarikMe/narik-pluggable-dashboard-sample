import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import { DashboardRow } from '../../dashboard-share/base/dashboard-row';
import { CommandHost, CommandInfo } from '@narik/infrastructure';
import { Observable } from 'rxjs/internal/Observable';
import { PluginService } from '../../dashboard-share/service/plugin.service';
import { WidgetViewType } from '../../dashboard-share/base/widget-view-type';

@Component({
  selector: 'dashboard-viewer',
  templateUrl: 'dashboard-viewer.component.html',
  styleUrls: ['dashboard-viewer.component.css'],
})
export class DashboardViewerComponent implements OnInit, CommandHost {
  change$: Observable<any>;

  @Input()
  showToolbar = true;

  @ViewChild('importFile', { static: false })
  importFile: ElementRef<any>;

  _rows: DashboardRow[] = [];
  @Input()
  set rows(value: DashboardRow[]) {
    if (value) {
      this.applyComponentTypes(value);
    }
    this._rows = value;
  }
  get rows(): DashboardRow[] {
    return this._rows;
  }

  constructor(private dashboardService: PluginService) {}

  ngOnInit() {}

  processCommand(cmd: CommandInfo) {
    if (cmd.commandKey === 'import') {
      this.importFile.nativeElement.click();
    }
  }

  import(e) {
    if (e.target.files[0]) {
      const that = this;
      const reader = new FileReader();
      reader.readAsText(e.target.files[0], 'UTF-8');
      reader.onload = (evt) => {
        const newModel = JSON.parse((evt.target as any).result)
          .rows as DashboardRow[];

        this.rows = newModel;
      };
      reader.onerror = (evt) => {};
    }
  }
  applyComponentTypes(rows: DashboardRow[]) {
    for (const row of rows) {
      for (const cell of row.cells) {
        if (cell.widgetInfo && cell.widgetInfo.widgetTypeKey) {
          this.dashboardService
            .widgetComponentType(
              undefined,
              cell.widgetInfo.widgetTypeKey,
              WidgetViewType.View
            )
            .then((type) => {
              cell.widgetInfo.widgetType = type;
            });
        }
      }
    }
  }
}
