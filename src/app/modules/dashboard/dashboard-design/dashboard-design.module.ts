import {
  NarikMatBusyIndicatorModule,
  NarikMatToolbarModule,
  NarikMatButtonModule,
  NarikMatSelectModule,
} from '@narik/ui-material';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardCellComponent } from './dashboard-cell/dashboard-cell.component';
import { DashboardDesignerComponent } from './dashboard-designer/dashboard-designer.component';
import { DashboardRowComponent } from './dashboard-row/dashboard-row.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SelectWidgetTypeComponent } from './select-widget-type/select-widget-type.component';
import { NarikCommonModule } from '@narik/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    NarikCommonModule,
    NarikMatBusyIndicatorModule,
    NarikMatToolbarModule,
    NarikMatButtonModule,
    NarikMatSelectModule,
    TranslateModule,
    DragDropModule,
  ],
  declarations: [
    DashboardDesignerComponent,
    DashboardCellComponent,
    DashboardRowComponent,
    SelectWidgetTypeComponent,
  ],
  exports: [DashboardDesignerComponent],
  providers: [],
})
export class DashboardDesignModule {}
