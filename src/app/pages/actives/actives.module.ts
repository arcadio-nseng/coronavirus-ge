import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivesRoutingModule } from './actives-routing.module';
import {ActivesComponent} from "./actives.component";
import {ComponentsModule} from "../../components/components.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxSkltnModule} from "ngx-skltn";


@NgModule({
  declarations: [ActivesComponent],
  imports: [
    CommonModule,
    ActivesRoutingModule, ComponentsModule, FontAwesomeModule, NgxSkltnModule
  ]
})
export class ActivesModule { }
