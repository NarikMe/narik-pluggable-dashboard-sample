import {
  CommandHost,
  CommandInfo,
  DialogResult,
  DialogService,
} from '@narik/infrastructure';
import { DashboardCell } from './../../dashboard-share/base/dashboard-cell';
import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SelectWidgetTypeComponent } from '../select-widget-type/select-widget-type.component';
import { DialogActions } from '@narik/core';
import { PluginService } from '../../dashboard-share/service/plugin.service';
import { WidgetViewType } from '../../dashboard-share/base/widget-view-type';
import { WidgetDesign } from 'dashboard-lib';
import { saveAs } from 'file-saver';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'dashboard-cell',
  templateUrl: 'dashboard-cell.component.html',
  styleUrls: ['dashboard-cell.component.css'],
})
export class DashboardCellComponent implements OnInit, CommandHost {
  change$: Observable<any>;

  @ViewChild('importFile', { static: false })
  importFile: ElementRef<any>;

  @Input()
  cell: DashboardCell = new DashboardCell();

  @HostBinding('class')
  classItems = '';

  @Output()
  removeRequest: EventEmitter<DashboardCell> = new EventEmitter<DashboardCell>();

  @Output()
  sizeChange: EventEmitter<any> = new EventEmitter<any>();

  modelChange: EventEmitter<any> = new EventEmitter<any>();

  isMouseOver = false;

  _size: number;
  @Input()
  set size(value: number) {
    if (this._size !== value) {
      this.sizeChange.emit(value);
    }
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

  constructor(
    private dialogService: DialogService,
    private dashboardService: PluginService
  ) {}

  ngOnInit() {}

  processCommand(cmd: CommandInfo) {
    if (cmd.commandKey === 'plus') {
      if (this.cell.size < 12) {
        this.cell.size++;
      }
    } else if (cmd.commandKey === 'minus') {
      if (this.cell.size > 1) {
        this.cell.size--;
      }
    } else if (cmd.commandKey === 'remove') {
      this.dialogService
        .showConfirm('dashboard.confirm-remove-cell', 'Confirm')
        .closed.then((result: DialogResult<any>) => {
          if (result.dialogResult === 'yes') {
            this.removeRequest.emit(this.cell);
          }
        });
    } else if (cmd.commandKey === 'clear') {
      this.dialogService
        .showConfirm('dashboard.confirm-clear-cell', 'Confirm')
        .closed.then((result: DialogResult<any>) => {
          if (result.dialogResult === 'yes') {
            this.cell.widgetInfo = undefined;
          }
        });
    } else if (cmd.commandKey === 'build') {
      if (this.cell.widgetInfo) {
        this.openDesigner();
      } else {
        this.openSelectWidgetType();
      }
    } else if (cmd.commandKey === 'import') {
      this.importFile.nativeElement.click();
    } else if (cmd.commandKey === 'export') {
      this.export();
    }
  }
  openDesigner() {
    this.dashboardService
      .widgetComponentType(
        undefined,
        this.cell.widgetInfo.widgetTypeKey,
        WidgetViewType.Design
      )
      .then((widgetType) => {
        this.dialogService
          .showDialog(
            widgetType,
            'dashboard.design',
            {
              model: cloneDeep(this.cell.widgetInfo.widgetModel),
            },
            DialogActions.ok_cancel,
            undefined,
            undefined,
            undefined,
            undefined
          )
          .closed.then((x: DialogResult<WidgetDesign>) => {
            if (x.dialogResult === 'ok') {
              this.cell.widgetInfo.widgetModel = x.componentInstance.model;
              this.modelChange.emit(x.componentInstance.model);
            }
          });
      });
  }

  openSelectWidgetType() {
    this.dialogService
      .showDialog(
        SelectWidgetTypeComponent,
        'dashboard.select-widget-type',
        undefined,
        DialogActions.ok_cancel,
        undefined,
        (result: DialogResult<SelectWidgetTypeComponent>) => {
          if (
            result.dialogResult === 'ok' &&
            !result.componentInstance.widgetType
          ) {
            return false;
          }
          return true;
        }
      )
      .closed.then((result: DialogResult<SelectWidgetTypeComponent>) => {
        if (result.dialogResult === 'ok') {
          const widgetTypeObject = result.componentInstance.widgetTypeObject;
          this.dashboardService
            .widgetComponentType(
              result.componentInstance.widgetTypeGroup,
              result.componentInstance.widgetType,
              WidgetViewType.View
            )
            .then((widgetType) => {
              const widgetModel = widgetTypeObject.defaultModel
                ? cloneDeep(widgetTypeObject.defaultModel)
                : {};
              widgetModel.isActive = true;
              this.cell.widgetInfo = {
                widgetTypeKey: result.componentInstance.widgetType,
                widgetType,
                widgetModel,
              };
              this.openDesigner();
            });
        }
      });
  }

  export() {
    if (this.cell && this.cell.widgetInfo) {
      const data = {
        widgetModel: this.cell.widgetInfo.widgetModel,
        widgetTypeKey: this.cell.widgetInfo.widgetTypeKey,
      };
      const blob = new Blob([JSON.stringify(data)], {
        type: 'application/octet-stream',
      });
      saveAs(blob, `${data.widgetModel.title || 'data'}.json`);
    }
  }

  import(e) {
    if (e.target.files[0]) {
      const that = this;
      const reader = new FileReader();
      reader.readAsText(e.target.files[0], 'UTF-8');
      reader.onload = (evt) => {
        const newModel = JSON.parse((evt.target as any).result);
        if (newModel.widgetTypeKey) {
          this.dashboardService
            .widgetComponentType(
              undefined,
              newModel.widgetTypeKey,
              WidgetViewType.View
            )
            .then((widgetType) => {
              this.cell.widgetInfo = {
                widgetTypeKey: newModel.widgetTypeKey,
                widgetType,
                widgetModel: newModel.widgetModel,
              };
            });

          that.modelChange.emit(newModel);
        }
      };
      reader.onerror = (evt) => {};
    }
  }
}
