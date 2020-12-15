import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import {
  NarikMatCheckBoxModule,
  NarikMatDataTableModule,
  NarikMatInputModule,
  NarikMatSelectModule
} from '@narik/ui-material';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { DataTableDesignComponent } from './designer/designer.component';
import { DataTableViewComponent } from './viewer/viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    DataTableDesignComponent,
    DataTableViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NarikMatDataTableModule,
    NarikMatInputModule,
    NarikMatSelectModule,
    NarikMatCheckBoxModule,
    TranslateModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
