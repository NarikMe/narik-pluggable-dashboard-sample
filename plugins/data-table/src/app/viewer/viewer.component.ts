import { Component, Injector } from '@angular/core';
import { MatLocalDataSource } from '@narik/ui-material';
import { WidgetView } from 'dashboard-lib';

@Component({
  templateUrl: './viewer.component.html',
  styles: [
    `
      .full-screen-table {
        height: 90vh !important;
      }
    `,
  ],
})
export class DataTableViewComponent extends WidgetView {
  dataSource: MatLocalDataSource<any> = new MatLocalDataSource<any>(
    undefined,
    undefined
  );
  pagingInfo: any;
  fields: any[] = [];
  enabledFullScreen = true;
  constructor(injector: Injector) {
    super(injector);
  }
  afterModelSet() {
    if (this.model.dataSource) {
      if (this.model.pageSize) {
        this.pagingInfo = {
          pageSize: +this.model.pageSize,
        };
      } else {
        this.pagingInfo = undefined;
      }
      this.dataSourceService
        .dataSourceMetadata(this.model.dataSource)
        .subscribe(
          (x: any[]) =>
            (this.fields = x.map((field) => {
              return {
                name: field.field,
                model: field.field,
                label: field.title || field.field,
                type: field.type,
                options: {},
              };
            }))
        );
      this.dataSourceService
        .dataSourceData(this.model.dataSource)
        .subscribe((x) => this.dataSource.setData(x));
    }
  }
}
