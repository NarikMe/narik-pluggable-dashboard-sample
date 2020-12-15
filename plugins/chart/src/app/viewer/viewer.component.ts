import {
  AfterViewInit,
  Component,
  Injector,
  NgModule,
  ViewContainerRef,
} from '@angular/core';
import {
  colorSets,
  NgxChartsModule,
  TooltipService,
} from '@swimlane/ngx-charts';
import * as shape from 'd3-shape';
import { WidgetView } from 'dashboard-lib';

import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import {
  NarikMatCheckBoxModule,
  NarikMatInputModule,
  NarikMatSelectModule,
} from '@narik/ui-material';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  templateUrl: './viewer.component.html',
  styleUrls: ['viewer.component.scss'],
})
export class ChartViewComponent extends WidgetView implements AfterViewInit {
  chartData: any[];
  enabledFullScreen = true;
  view: any[];

  colorScheme: any;

  // heatmap
  heatmapMin = 0;
  heatmapMax = 50000;

  curves = {
    Basis: shape.curveBasis,
    'Basis Closed': shape.curveBasisClosed,
    Bundle: shape.curveBundle.beta(1),
    Cardinal: shape.curveCardinal,
    'Cardinal Closed': shape.curveCardinalClosed,
    'Catmull Rom': shape.curveCatmullRom,
    'Catmull Rom Closed': shape.curveCatmullRomClosed,
    Linear: shape.curveLinear,
    'Linear Closed': shape.curveLinearClosed,
    'Monotone X': shape.curveMonotoneX,
    'Monotone Y': shape.curveMonotoneY,
    Natural: shape.curveNatural,
    Step: shape.curveStep,
    'Step After': shape.curveStepAfter,
    'Step Before': shape.curveStepBefore,
    default: shape.curveLinear,
  };
  curve: any = this.curves['Linear'];
  closedCurve: any = this.curves['Linear Closed'];

  constructor(
    injector: Injector,
    tooltipService: TooltipService,
    viewContainerRef: ViewContainerRef
  ) {
    super(injector);
    tooltipService.injectionService.setRootViewContainer(viewContainerRef);
    this.setColorScheme('cool');
  }
  setColorScheme(name) {
    this.colorScheme = colorSets.find((s) => s.name === name);
  }

  select() {}
  onLegendLabelClick() {}

  activate() {}

  deactivate() {}

  applyDimensions() {
    this.view = [+this.model.width, +this.model.height];
  }

  getInterpolationType() {
    return;
  }

  afterModelSet() {
    this.model.schemeType = this.model.schemeType || 'ordinal';

    if (this.model.dataSource) {
      this.dataSourceService
        .dataSourceData(this.model.dataSource)
        .subscribe((x) => (this.chartData = x));
    }

    if (this.model.width || this.model.height) {
      this.applyDimensions();
    } else {
      this.view = undefined;
    }

    this.setColorScheme(this.model.colorScheme || 'cool');

    if (this.model.curve) {
      this.curve = this.curves[this.model.curve] || this.curves['default'];
    }
    if (this.model.closedCurve) {
      this.closedCurve =
        this.curves[this.model.closedCurve] || this.curves['default'];
    }
    this.doOnResize(0);
  }

  ngAfterViewInit(): void {}

  doOnResize(newSize: number) {
    this.view = [0, 0];
    setTimeout(() => {
      if (this.model && (this.model.width || this.model.height)) {
        this.applyDimensions();
      } else {
        this.view = undefined;
      }
    }, 0);
  }
}

@NgModule({
  declarations: [ChartViewComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NarikMatSelectModule,
    NarikMatInputModule,
    NarikMatCheckBoxModule,
    NgxChartsModule,
    MatIconModule,
    TranslateModule,
  ],
  providers: [],
  bootstrap: [],
})
export class ViewModule {
  constructor() {}
}
