import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { COMPONENTS } from './index';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {
  NbActionsModule,
  NbCardModule,
  NbContextMenuModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbSidebarService,
  NbUserModule,
  NbIconModule,
} from '@nebular/theme';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NbActionsModule,
    NbCardModule,
    NbContextMenuModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbSearchModule,
    NbSidebarModule,
    NbIconModule,
    NbUserModule,
    MatSlideToggleModule,
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  providers: [NbSidebarService],
})
export class NarikNgxLayout {}
