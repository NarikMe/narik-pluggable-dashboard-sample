import { Component, Injector } from '@angular/core';
import { WidgetView } from 'dashboard-lib';

@Component({
  templateUrl: './viewer.component.html',
  styles: [
    `
      a {
        color: #1a2138;
      }
    `,
  ],
})
export class LinkViewComponent extends WidgetView {
  constructor(injector: Injector) {
    super(injector);
  }
}
