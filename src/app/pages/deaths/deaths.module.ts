import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeathsRoutingModule } from './deaths-routing.module';
import {DeathsComponent} from "./deaths.component";
import {ComponentsModule} from "../../components/components.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxSkltnModule} from "ngx-skltn";


@NgModule({
  declarations: [DeathsComponent],
  imports: [
    CommonModule,
    DeathsRoutingModule,
    ComponentsModule,
    FontAwesomeModule,
    NgxSkltnModule
  ]
})
export class DeathsModule { }
