import { Component, Injector } from '@angular/core';
import { WidgetDesign } from 'dashboard-lib';

@Component({
  templateUrl: './designer.component.html',
})
export class KpiDesignComponent extends WidgetDesign {
  needDataSource = true;

  constructor(injector: Injector) {
    super(injector);
  }
}
