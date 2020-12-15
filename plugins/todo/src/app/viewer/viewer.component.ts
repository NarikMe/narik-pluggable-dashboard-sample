import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  NgModule,
} from '@angular/core';
import { WidgetView } from 'dashboard-lib';

@Component({
  templateUrl: './viewer.component.html',
  styleUrls: ['viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoViewComponent extends WidgetView {
  todoItems: any[] = [];
  constructor(
    injector: Injector,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(injector);
  }
  afterModelSet() {
    if (this.model.dataSource) {
      this.dataSourceService
        .dataSourceData(this.model.dataSource)
        .subscribe((x) => {
          this.todoItems = x;
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  get remainCount() {
    return this.todoItems.filter((x) => !x.done).length;
  }

  setDone(item: any, isDone: boolean) {
    item.done = isDone;
    this.changeDetectorRef.detectChanges();
  }
}
