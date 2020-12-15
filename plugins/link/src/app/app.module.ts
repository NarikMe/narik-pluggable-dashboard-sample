import { LinkDesignComponent } from './designer/designer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LinkViewComponent } from './viewer/viewer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import {
  NarikMatButtonModule,
  NarikMatCheckBoxModule,
  NarikMatInputModule,
  NarikMatSelectModule,
} from '@narik/ui-material';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, LinkDesignComponent, LinkViewComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MatListModule,
    NarikMatCheckBoxModule,
    NarikMatSelectModule,
    NarikMatInputModule,
    NarikMatButtonModule,
    MatCardModule,
    MatIconModule,
    TranslateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
