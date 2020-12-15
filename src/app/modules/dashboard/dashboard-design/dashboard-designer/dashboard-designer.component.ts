import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import { DashboardRow } from '../../dashboard-share/base/dashboard-row';
import { CommandHost, CommandInfo } from '@narik/infrastructure';
import { Observable } from 'rxjs/internal/Observable';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { saveAs } from 'file-saver';
import { PluginService } from '../../dashboard-share/service/plugin.service';
import { WidgetViewType } from '../../dashboard-share/base/widget-view-type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'dashboard-designer',
  templateUrl: 'dashboard-designer.component.html',
  styleUrls: ['dashboard-designer.component.css'],
})
export class DashboardDesignerComponent implements OnInit, CommandHost {
  change$: Observable<any>;

  selectedRow: DashboardRow;
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

  @ViewChild('importFile', { static: false })
  importFile: ElementRef<any>;

  constructor(
    private dashboardService: PluginService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {}

  processCommand(cmd: CommandInfo) {
    if (cmd.commandKey === 'add') {
      const newRow = new DashboardRow(cmd.commandData || 1);
      if (this.selectedRow) {
        const pos = this.rows.indexOf(this.selectedRow);
        this.rows.splice(pos + 1, 0, newRow);
      } else {
        this.rows.push(newRow);
      }
    } else if (cmd.commandKey === 'import') {
      this.importFile.nativeElement.click();
    } else if (cmd.commandKey === 'export') {
      this.export();
    } else if (cmd.commandKey === 'importSample') {
      this.httpClient.get(`assets/samples/1.json`).subscribe((result: any) => {
        this.rows = result.rows;
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.rows, event.previousIndex, event.currentIndex);
  }

  removeRow(row: DashboardRow) {
    const pos = this.rows.indexOf(row);
    if (pos >= 0) {
      this.rows.splice(pos, 1);
    }
  }

  export() {
    const data = {
      rows: this.rows,
    };
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/octet-stream',
    });
    saveAs(blob, `${'data'}.json`);
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
