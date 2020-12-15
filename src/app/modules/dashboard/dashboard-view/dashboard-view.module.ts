import { NarikCommonModule } from '@narik/common';
import {
  NarikMatBusyIndicatorModule,
  NarikMatToolbarModule,
} from '@narik/ui-material';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { DashboardViewCellComponent } from './dashboard-view-cell/dashboard-view-cell.component';
import { DashboardViewRowComponent } from './dashboard-view-row/dashboard-view-row.component';
import { DashboardViewerComponent } from './dashboard-viewer/dashboard-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    NarikCommonModule,
    NarikMatToolbarModule,
    NarikMatBusyIndicatorModule,
    RouterModule,
  ],
  declarations: [
    DashboardViewRowComponent,
    DashboardViewCellComponent,
    DashboardViewerComponent,
  ],
  exports: [DashboardViewerComponent],
  providers: [],
})
export class DashboardViewModule {}
