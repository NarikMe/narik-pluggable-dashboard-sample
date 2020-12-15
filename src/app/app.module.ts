import { NarikAppCoreModule } from '@narik/app-core';
import { NarikClientStorageModule } from '@narik/client-storage';
import {
  MEMORY_STORAGE_VALIDITY_LEN,
  NarikCoreModule,
  NarikModule,
  NarikTranslateLoader,
} from '@narik/core';
import {
  ConfigService,
  MODULE_DATA_KEY,
  MODULE_UI_KEY,
  ModuleInfo,
  ModuleManager,
  ModuleEventArg,
} from '@narik/infrastructure';
import { NarikJwtAuthenticationModule } from '@narik/jwt-authentication';
import { NarikUiCoreModule } from '@narik/ui-core';
import { FORM_ITEM_DEFAULT_CLASS } from '@narik/ui-material';
import { Observable } from 'rxjs/internal/Observable';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule, NbLayoutDirection, NbThemeModule } from '@nebular/theme';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { MainComponent } from './main/main.component';

import { NarikNgxLayout } from './modules/narik-ngx-layout/narik-ngx-layout.module';
import { ShareModule } from './modules/share/share.module';
import { DemoCommandProcessor } from './services/command-processor.service';
import { DashboardDesignModule } from './modules/dashboard/dashboard-design/dashboard-design.module';
import { DashboardViewModule } from './modules/dashboard/dashboard-view/dashboard-view.module';
import { DashboardShareModule } from './modules/dashboard/dashboard-share/dashboard-share.module';
import { PluginService } from './modules/dashboard/dashboard-share/service/plugin.service';
import { DataSourceService } from 'dashboard-lib';

const moduleKey = 'main';

@NgModule({
  declarations: [AppComponent, MainComponent, MainViewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, ConfigService],
      },
    }),
    NarikCoreModule.forRoot({
      configFilePath: 'assets/app-config.json',
      defaultLang: 'en',
      useDefaultLang: true,
      commandProcessor: DemoCommandProcessor,
    }),
    NarikUiCoreModule,
    NarikAppCoreModule.forRoot({}),
    NarikJwtAuthenticationModule.forRoot({
      loginEndPoint: 'api/account/Authenticate',
      logoutEndPoint: 'api/account/Logout',
      refreshEndPoint: 'api/account/Authenticate',
      tokenStorage: 'localStorage',
      loginPageUrl: '/',
    }),

    NbEvaIconsModule,
    NbIconModule,
    NbThemeModule.forRoot(
      { name: 'default' },
      undefined,
      undefined,
      NbLayoutDirection.LTR
    ),

    BrowserAnimationsModule,
    NarikClientStorageModule.forRoot(),
    NarikNgxLayout,
    ShareModule,
    DashboardDesignModule,
    DashboardViewModule,
    DashboardShareModule,
  ],
  providers: [
    {
      provide: MODULE_DATA_KEY,
      useValue: moduleKey,
    },
    {
      provide: MODULE_UI_KEY,
      useValue: moduleKey,
    },
    {
      provide: MEMORY_STORAGE_VALIDITY_LEN,
      useValue: 1,
    },
    {
      provide: FORM_ITEM_DEFAULT_CLASS,
      useValue: 'item-full-width',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule extends NarikModule {
  constructor(
    injector: Injector,
    moduleManager: ModuleManager,
    dashboardService: PluginService,
    dataSourceService: DataSourceService
  ) {
    super(injector);
    moduleManager.modulesChanged.subscribe((x: ModuleEventArg) => {
      if (x.moduleKey === 'main') {
        dashboardService.init();
        dataSourceService.init();
      }
    });
  }

  get key() {
    return moduleKey;
  }
  get moduleInfo(): Observable<ModuleInfo> {
    return this.loadInfoFromJson();
  }
}

export function HttpLoaderFactory(
  http: HttpClient,
  configService: ConfigService
) {
  return new NarikTranslateLoader(http, configService, ['app']);
}
