import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import {
  NarikMatCheckBoxModule,
  NarikMatInputModule,
} from '@narik/ui-material';
import { TranslateModule } from '@ngx-translate/core';
import { DateTimeDesignComponent } from './designer/designer.component';
import { DateTimeViewComponent } from './viewer/viewer.component';
import { DateFnsModule } from 'ngx-date-fns';
@NgModule({
  declarations: [DateTimeDesignComponent, DateTimeViewComponent],
  imports: [
    BrowserModule,
    NarikMatInputModule,
    FormsModule,
    MatIconModule,
    TranslateModule,
    NarikMatCheckBoxModule,
    DateFnsModule,
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
