import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import {
  NarikMatCheckBoxModule,
  NarikMatInputModule,
  NarikMatSelectModule,
} from '@narik/ui-material';
import { TranslateModule } from '@ngx-translate/core';
import { KpiDesignComponent } from './designer/designer.component';
import { KpiViewComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [KpiViewComponent, KpiDesignComponent],
  imports: [
    BrowserModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    NarikMatSelectModule,
    NarikMatCheckBoxModule,
    NarikMatInputModule,
    FormsModule,
    TranslateModule,
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
