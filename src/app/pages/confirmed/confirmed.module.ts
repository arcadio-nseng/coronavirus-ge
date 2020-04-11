import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ConfirmedRoutingModule} from "./confirmed-routing.module";
import {ConfirmedComponent} from "./confirmed.component";
import {ComponentsModule} from "../../components/components.module";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faCaretDown, faCaretUp, faEquals} from "@fortawesome/free-solid-svg-icons";
import {NgxSkltnModule} from "ngx-skltn";


@NgModule({
  declarations: [ConfirmedComponent],
  imports: [
    CommonModule,
    ConfirmedRoutingModule,
    ComponentsModule,
    FontAwesomeModule,
    NgxSkltnModule
  ]
})
export class ConfirmedModule {
  constructor(private iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(faCaretUp, faCaretDown, faEquals);
  }
}
