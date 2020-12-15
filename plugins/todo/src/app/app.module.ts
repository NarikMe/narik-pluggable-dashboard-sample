import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import {
  NarikMatCheckBoxModule,
  NarikMatInputModule,
  NarikMatSelectModule,
} from '@narik/ui-material';
import { AppComponent } from './app.component';
import { TodoDesignComponent } from './designer/designer.component';
import { TodoViewComponent } from './viewer/viewer.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [AppComponent, TodoViewComponent, TodoDesignComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MatListModule,
    NarikMatCheckBoxModule,
    NarikMatSelectModule,
    NarikMatInputModule,
    TranslateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
