import { Observable } from 'rxjs/internal/Observable';

import { ComponentFactory, Type } from '@angular/core';

import { WidgetViewType } from '../base/widget-view-type';

export class WidgetType {
  key: string;
  value: string;
  isEnabled: boolean;
  defaultModel: any;
  designComponent?: string;
  viewComponent?: string;
  remote?: RemoteInformation;
}

export interface RemoteInformation {
  mode: 'development' | 'production';
  entry:
    | string
    | {
        development: string;
        production: string;
      };
  viewer: {
    module?: string;
    componentModule?: string;
    component: string;
  };
  designer: {
    module?: string;
    componentModule?: string;
    component: string;
  };
}
export class WidgetTypeGroup {
  key: string;
  value: string;
  isEnabled: boolean;
  widgetTypes: WidgetType[];
}

export abstract class PluginService {
  abstract init();
  abstract widgetGroups(): Observable<WidgetTypeGroup[]>;
  abstract widgetComponentType(
    widgetGroup: string,
    widgetKey: string,
    widgetType: WidgetViewType
  ): Promise<Type<any> | ComponentFactory<any>>;
}
