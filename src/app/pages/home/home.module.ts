import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {ComponentsModule} from "../../components/components.module";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ComponentsModule,
        NgxSkeletonLoaderModule,
        FontAwesomeModule
    ]
})
export class HomeModule { }
