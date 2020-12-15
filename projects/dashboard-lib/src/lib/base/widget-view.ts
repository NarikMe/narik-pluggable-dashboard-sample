import { Directive, ElementRef, Injector, Input, OnInit } from '@angular/core';
import { isEquivalent } from '@narik/common';
import { NarikInject } from '@narik/core';
import { NarikComponent } from '@narik/infrastructure';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { DataSourceService } from '../services/dataSource.service';
import { WidgetModel } from './widget-model';

@Directive()
export class WidgetView extends NarikComponent implements OnInit {
  isFullScreen = false;
  enabledFullScreen = false;
  displayTitle = true;
  _model: WidgetModel = {};
  _size: number;
  @NarikInject(DataSourceService)
  protected dataSourceService: DataSourceService;

  @NarikInject(ElementRef)
  protected elementRef: ElementRef;

  private sizeChangedSubject = new Subject<number>();

  set size(value: number) {
    if (this._size && this._size !== value) {
      this.sizeChangedSubject.next(value);
    }
    this._size = value;
  }
  get size(): number {
    return this._size;
  }

  @Input()
  set model(value: any) {
    const tepModel = this.importModel(value);
    if (!isEquivalent(this._model, tepModel)) {
      this._model = tepModel;
      this.afterModelSet();
    }
  }
  get model(): any {
    return this._model;
  }

  protected importModel(model: any): any {
    return model;
  }

  constructor(private injector: Injector) {
    super();
    this.sizeChangedSubject
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        takeWhile(() => this.isAlive)
      )
      .subscribe((size) => {
        this.doOnResize(size);
      });
  }

  ngOnInit(): void {
    if (this.enabledFullScreen) {
      fromEvent(this.elementRef.nativeElement, 'fullscreenchange')
        .pipe(takeWhile(() => this.isAlive))
        .subscribe((x: any) => {
          this.isFullScreen = !!document.fullscreenElement;
        });
    }
  }

  afterModelSet() {}

  toggleFullScreen() {
    if (this.enabledFullScreen) {
      if (this.isFullScreen) {
        document.exitFullscreen();
      } else {
        const elem = this.elementRef.nativeElement;
        const methodToBeInvoked =
          elem.requestFullscreen ||
          elem.webkitRequestFullScreen ||
          elem['mozRequestFullscreen'] ||
          elem['msRequestFullscreen'];
        if (methodToBeInvoked) {
          methodToBeInvoked.call(elem);
        }
      }
    }
  }

  doOnResize(newSize: number) {}
}
