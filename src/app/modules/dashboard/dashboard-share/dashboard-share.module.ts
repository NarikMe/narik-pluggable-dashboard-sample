import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PluginService } from './service/plugin.service';
import { NarikPluginService } from './service/narik-plugin.service';
import { DataSourceService } from 'dashboard-lib';
import { NarikDataSourceService } from './service/narik-dataSource.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: PluginService,
      useClass: NarikPluginService,
    },
    {
      provide: DataSourceService,
      useClass: NarikDataSourceService,
    },
  ],
})
export class DashboardShareModule {
  /**
   *
   */
  constructor() {}
}
