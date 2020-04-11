import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {ComponentsModule} from "../components/components.module";
import {ConfirmedModule} from "./confirmed/confirmed.module";
import {ActivesModule} from "./actives/actives.module";
import {DeathsModule} from "./deaths/deaths.module";
import {RecoveredModule} from "./recovered/recovered.module";
import {HomeModule} from "./home/home.module";
import {NgxSkltnModule, SkltnConfig} from "ngx-skltn";

const skltnConfig: SkltnConfig = {
  rectRadius: 10,
  flareWidth: '150px',
  bgFill: '#d8d5d1',
  flareFill: 'rgba(255,255,255, 0.5)',
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    ConfirmedModule,
    ActivesModule,
    DeathsModule,
    RecoveredModule,
    HomeModule,
    NgxSkltnModule.forRoot(skltnConfig)
  ],
})
export class PagesModule { }
