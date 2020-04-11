import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActivesComponent} from "./actives.component";


const routes: Routes = [
  {
    path: '',
    component: ActivesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivesRoutingModule { }
