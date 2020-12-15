import { Observable } from 'rxjs/internal/Observable';

export interface DashboardDataSource {
  key: string;
  metaData: any;
  data: any;
}

export abstract class DataSourceService {
  abstract init();
  abstract dataSourceList(): Observable<string[]>;
  abstract dataSourceMetadata(dataSourceKey: string): Observable<any>;
  abstract dataSourceData(
    dataSourceKey: string,
    parameters?: any[]
  ): Observable<any>;
}
