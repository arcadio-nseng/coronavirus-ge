import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecoveredComponent} from "./recovered.component";


const routes: Routes = [
  {
    path: '',
    component: RecoveredComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoveredRoutingModule { }
