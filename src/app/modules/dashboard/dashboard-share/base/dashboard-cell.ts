import { ComponentFactory, Type } from '@angular/core';

export class DashboardCell {
  static colClasses = ['col-md-'];

  size: number;
  constructor(size?: number) {
    this.size = size || 12;
  }

  widgetInfo?: {
    widgetTypeKey?: string;
    widgetType?: Type<any> | ComponentFactory<any>;
    widgetModel?: any;
  };
}
