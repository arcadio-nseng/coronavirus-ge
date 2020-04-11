import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoveredRoutingModule } from './recovered-routing.module';
import {RecoveredComponent} from "./recovered.component";
import {ComponentsModule} from "../../components/components.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxSkltnModule} from "ngx-skltn";


@NgModule({
  declarations: [RecoveredComponent],
  imports: [
    CommonModule,
    RecoveredRoutingModule,
    ComponentsModule,
    FontAwesomeModule,
    NgxSkltnModule
  ]
})
export class RecoveredModule { }
