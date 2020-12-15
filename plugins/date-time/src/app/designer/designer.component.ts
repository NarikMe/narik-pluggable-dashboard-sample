import { Component, Injector } from '@angular/core';
import { WidgetDesign } from 'dashboard-lib';

@Component({
  templateUrl: './designer.component.html',
})
export class DateTimeDesignComponent extends WidgetDesign {
  displayTitle = false;

  constructor(injector: Injector) {
    super(injector);
  }
}
