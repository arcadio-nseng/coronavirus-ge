import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapComponent} from "./map/map.component";
import {LineChartComponent} from "./line-chart/line-chart.component";
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import {ChartsModule} from "ng2-charts";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faHome, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import {RouterModule} from "@angular/router";
import { NoticeComponent } from './notice/notice.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import {NgxSkltnModule} from "ngx-skltn";


@NgModule({
  declarations: [
    MapComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    HeaderComponent,
    FooterComponent,
    NoticeComponent,
    SkeletonLoaderComponent
  ],
  exports: [
    MapComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    HeaderComponent,
    FooterComponent,
    NoticeComponent,
    SkeletonLoaderComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FontAwesomeModule, RouterModule, NgxSkltnModule
  ]
})
export class ComponentsModule {
  constructor(private iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(faPhoneAlt, faHome)
  }
}
