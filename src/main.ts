import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { loadRemoteEntry } from '@angular-architects/module-federation';
import {
  WidgetType,
  WidgetTypeGroup,
} from './app/modules/dashboard/dashboard-share/service/plugin.service';
import { isString } from '@narik/common';
import 'reflect-metadata';

if (environment.production) {
  enableProdMode();
}

fetch('assets/dashboard.json').then((res) => {
  res.json().then((data: { widgetTypeGroups: WidgetTypeGroup[] }) => {
    const plugins: WidgetType[] = Array.prototype.concat.apply(
      [],
      data.widgetTypeGroups.map((g) => g.widgetTypes.filter((d) => !!d.remote))
    );

    Promise.all(
      plugins.map((p) =>
        loadRemoteEntry(
          isString(p.remote.entry)
            ? p.remote.entry
            : p.remote.mode === 'production'
            ? p.remote.entry.production
            : p.remote.entry.development,
          p.key
        ).then(
          (entry) => {
            return entry;
          },
          (error) => {
            console.error('could not load entry for:' + p.key);
          }
        )
      )
    ).then(() => {
      platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch((err) => console.error(err));
    });
  });
});
