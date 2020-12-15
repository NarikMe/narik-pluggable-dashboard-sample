import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { WidgetView } from 'dashboard-lib';
import { interval } from 'rxjs/internal/observable/interval';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';

@Component({
  templateUrl: './viewer.component.html',
  styles: [
    `
      .date-container {
        display: flex;
      }

      .center-item {
        margin: auto;
      }

      .datetime-content {
        font-weight: bold;
      }
    `,
  ],
})
export class DateTimeViewComponent
  extends WidgetView
  implements OnInit, OnDestroy {
  today: any = new Date();
  displayTitle = false;
  isAlive = true;
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    interval(1000)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => {
        this.today = new Date();
      });
  }
  afterModelSet() {}

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
