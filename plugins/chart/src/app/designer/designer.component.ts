import { Component, Injector, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { toDtoArray } from '@narik/common';
import {
  NarikMatCheckBoxModule,
  NarikMatInputModule,
  NarikMatSelectModule,
} from '@narik/ui-material';
import { TranslateModule } from '@ngx-translate/core';
import { colorSets } from '@swimlane/ngx-charts';
import { WidgetDesign } from 'dashboard-lib';
import chartGroups from './chartTypes';

@Component({
  templateUrl: './designer.component.html',
  styles: [
    `
      .flex-container {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class ChartDesignComponent extends WidgetDesign implements OnInit {
  chartGroups: any[] = [];

  charts: any[] = [];
  needDataSource = true;
  chart: any = { options: [] };

  curves = toDtoArray([
    'Basis',
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before',
  ]);

  closedCurves = toDtoArray([
    'Basis Closed',
    'Cardinal Closed',
    'Catmull Rom Closed',
    'Linear Closed',
  ]);

  themes: any[] = [
    {
      id: 'dark',
      title: 'Dark',
    },
    {
      id: 'light',
      title: 'Light',
    },
  ];
  legendPositions: any[] = [
    {
      id: 'right',
      title: 'Right',
    },
    {
      id: 'below',
      title: 'Below',
    },
  ];
  schemeTypes: any[] = [
    {
      id: 'ordinal',
      title: 'Ordinal',
    },
    {
      id: 'linear',
      title: 'Linear',
    },
  ];

  colorSchemes: any[] = colorSets.map((x) => {
    return {
      id: x.name,
      title: x.name,
    };
  });

  constructor(injector: Injector) {
    super(injector);
    this.chartGroups = chartGroups;
    this.charts = Array.prototype.concat.apply(
      [],
      chartGroups.map((g) => g.charts)
    );
  }

  afterModelSet() {
    this.chartGroups = chartGroups;
    if (this.model && this.model.chartType) {
      this.selectChart(this.model.chartType);
    }
  }
  selectChart(chartSelector) {
    for (const group of this.chartGroups) {
      this.chart = group.charts.find((x) => x.selector === chartSelector);
      if (this.chart) {
        break;
      }
    }
  }
}

@NgModule({
  declarations: [ChartDesignComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    NarikMatSelectModule,
    NarikMatInputModule,
    MatSelectModule,
    NarikMatCheckBoxModule,
    MatIconModule,
    TranslateModule,
  ],
  providers: [],
  bootstrap: [],
})
export class DesignerModule {}
