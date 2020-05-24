import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ComponentsModule} from "./components/components.module";
import {PagesModule} from "./pages/pages.module";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import {ModuleMapLoaderModule} from "@nguniversal/module-map-ngfactory-loader";

import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from "@angular/common";
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    PagesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // ModuleMapLoaderModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
