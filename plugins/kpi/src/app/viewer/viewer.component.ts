import { Component, Injector } from '@angular/core';
import { WidgetView } from 'dashboard-lib';

@Component({
  templateUrl: './viewer.component.html',
  styles: [
    `
      mat-chip {
        border-radius: 24px;
        position: relative;
        overflow: hidden;
      }

      .icon-chip {
        font-size: 11px !important;
        padding: 4px 8px !important;
        display: flex !important;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class KpiViewComponent extends WidgetView {
  displayTitle = false;
  kpiInfo: any = {};
  constructor(injector: Injector) {
    super(injector);
  }
  afterModelSet() {
    if (this.model.dataSource) {
      this.dataSourceService
        .dataSourceData(this.model.dataSource)
        .subscribe((x) => (this.kpiInfo = x));
    }
  }
}
