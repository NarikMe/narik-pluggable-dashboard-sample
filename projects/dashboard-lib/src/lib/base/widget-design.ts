import { Directive, Injector, Input, OnInit } from '@angular/core';
import { isEquivalent } from '@narik/common';
import { NarikInject } from '@narik/core';
import { NarikComponent, PARAMETERS } from '@narik/infrastructure';
import { UUID } from 'angular2-uuid';
import { DataSourceService } from '../services/dataSource.service';
import { WidgetModel } from './widget-model';

@Directive()
export class WidgetDesign extends NarikComponent implements OnInit {
  @NarikInject(DataSourceService)
  protected dataSourceService: DataSourceService;

  @NarikInject(PARAMETERS, {})
  parameters: any;

  displayTitle = true;
  needDataSource = false;
  _model: WidgetModel = {};
  dataSources: any[] = [];

  selectOptions: any = {
    showToolbar: false,
  };

  @Input()
  set model(value: any) {
    const tempModel = this.importModel(value);
    if (!isEquivalent(this._model, tempModel)) {
      this._model = tempModel;
      this.afterModelSet();
    }
  }
  get model(): any {
    if (this._model && !this._model.uniqueId) {
      this._model.uniqueId = UUID.UUID();
    }
    return this.exportModel(this._model);
  }

  constructor(private injector: Injector) {
    super();
    if (this.parameters) {
      this.model = this.parameters.model;
    }
  }

  protected importModel(model: any): any {
    return model;
  }
  protected exportModel(model: any): any {
    return model;
  }

  ngOnInit(): void {
    if (this.needDataSource) {
      this.dataSourceService.dataSourceList().subscribe(
        (x) =>
          (this.dataSources = x.map((ds) => {
            return {
              id: ds,
              title: ds,
            };
          }))
      );
    }
  }

  afterModelSet() {}
}
