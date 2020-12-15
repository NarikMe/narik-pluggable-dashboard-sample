import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import {
  Type,
  Injectable,
  Injector,
  Compiler,
  ComponentFactory,
} from '@angular/core';

import { WidgetViewType } from '../base/widget-view-type';
import { PluginService, WidgetTypeGroup } from './plugin.service';
import {
  DataProviderService,
  ComponentTypeResolver,
} from '@narik/infrastructure';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Injectable()
export class NarikPluginService extends PluginService {
  groups: WidgetTypeGroup[];

  private componentTypes = new Map<string, Type<any> | ComponentFactory<any>>();
  constructor(
    private dataProvider: DataProviderService,
    private typeResolver: ComponentTypeResolver,
    private injector: Injector,
    private compiler: Compiler
  ) {
    super();
  }

  init() {
    this.dataProvider
      .getData({
        dataKey: 'widgetTypes',
      })
      .subscribe((x: any) => (this.groups = x.widgetTypeGroups));
  }
  widgetGroups(): Observable<WidgetTypeGroup[]> {
    return of(this.groups);
  }

  widgetComponentType(
    widgetGroup: string,
    widgetKey: string,
    widgetViewType: WidgetViewType
  ): Promise<Type<any> | ComponentFactory<any>> {
    if (!widgetGroup) {
      widgetGroup = this.findWidgetGroup(widgetKey);
    }
    const resolvedType = this.componentTypes.get(
      `${widgetKey}_${widgetViewType}`
    );
    if (resolvedType) {
      return Promise.resolve(resolvedType);
    }
    const group = this.groups.filter((x) => x.key === widgetGroup)[0];
    if (group) {
      const widgetType = group.widgetTypes.filter(
        (x) => x.key === widgetKey
      )[0];
      if (widgetType) {
        if (widgetType.remote) {
          return loadRemoteModule({
            remoteName: widgetType.key,
            exposedModule:
              widgetViewType === WidgetViewType.Design
                ? widgetType.remote.designer.module
                : widgetType.remote.viewer.module,
          }).then((m) => {
            const componentModule =
              widgetViewType === WidgetViewType.Design
                ? widgetType.remote.designer.componentModule
                : widgetType.remote.viewer.componentModule;
            if (componentModule) {
              return this.compiler
                .compileModuleAsync(m[componentModule])
                .then((moduleFactory) => {
                  const moduleRef = moduleFactory.create(this.injector);
                  const component =
                    widgetViewType === WidgetViewType.Design
                      ? m[widgetType.remote.designer.component]
                      : m[widgetType.remote.viewer.component];

                  const factory = moduleRef.componentFactoryResolver.resolveComponentFactory(
                    component
                  );
                  this.componentTypes.set(
                    `${widgetKey}_${widgetViewType}`,
                    factory
                  );
                  return factory;
                });
            } else {
              const component =
                widgetViewType === WidgetViewType.Design
                  ? m[widgetType.remote.designer.component]
                  : m[widgetType.remote.viewer.component];
              this.componentTypes.set(
                `${widgetKey}_${widgetViewType}`,
                component
              );
              return component;
            }
          });
        } else {
          let typeString = '';
          if (widgetViewType === WidgetViewType.Design) {
            typeString =
              widgetType.designComponent ||
              `${widgetType.key}WidgetDesignComponent`;
          } else {
            if (widgetViewType === WidgetViewType.View) {
              typeString =
                widgetType.viewComponent ||
                `${widgetType.key}WidgetViewComponent`;
            }
          }

          const componentTye = this.typeResolver.resolveComponentType(
            typeString
          );
          this.componentTypes.set(
            `${widgetKey}_${widgetViewType}`,
            componentTye
          );
          return Promise.resolve(componentTye);
        }
      }
    }
    return undefined;
  }
  findWidgetGroup(widgetKey: string): string {
    return this.groups.filter(
      (x) => x.widgetTypes.filter((w) => w.key === widgetKey)[0]
    )[0].key;
  }
}
