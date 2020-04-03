import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChartsModule} from "ng2-charts";
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MapComponent } from './map/map.component';
import {HttpClientModule} from "@angular/common/http";
import { LineChartComponent } from './line-chart/line-chart.component';
import { NgxSkeletonLoaderModule} from "ngx-skeleton-loader";

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    PieChartComponent,
    MapComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, ChartsModule, HttpClientModule, NgxSkeletonLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
