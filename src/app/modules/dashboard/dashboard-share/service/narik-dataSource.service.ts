import { map } from 'rxjs/internal/operators/map';
import { DataSourceService, DashboardDataSource } from 'dashboard-lib';
import { Observable } from 'rxjs/internal/Observable';
import { DataProviderService } from '@narik/infrastructure';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NarikDataSourceService extends DataSourceService {
  dataSources: DashboardDataSource[];

  isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isReady$ = this.isReady.asObservable().pipe((ready) => ready);
  constructor(private dataProvider: DataProviderService) {
    super();
  }

  init() {
    this.dataProvider
      .getData({
        dataKey: 'widgetData',
      })
      .subscribe((x: any) => {
        this.dataSources = x.dataSources;
        this.isReady.next(true);
      });
  }

  dataSourceList(): Observable<string[]> {
    return this.isReady$.pipe(map(() => this.dataSources.map((x) => x.key)));
  }
  dataSourceMetadata(dataSourceKey: string): Observable<any> {
    return this.isReady$.pipe(
      map(
        () =>
          this.dataSources.filter((x) => x.key === dataSourceKey)[0].metaData
      )
    );
  }
  dataSourceData(dataSourceKey: string, parameters: any[]): Observable<any> {
    return this.isReady$.pipe(
      map(() => this.dataSources.filter((x) => x.key === dataSourceKey)[0].data)
    );
  }
}
