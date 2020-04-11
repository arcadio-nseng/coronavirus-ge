import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: 'casos-confirmados',
    loadChildren: './pages/confirmed/confirmed.module#ConfirmedModule'
  },
  {
    path: 'casos-activos',
    loadChildren: './pages/actives/actives.module#ActivesModule'
  },
  {
    path: 'fallecidos',
    loadChildren: './pages/deaths/deaths.module#DeathsModule'
  },
  {
    path: 'recuperados',
    loadChildren: './pages/recovered/recovered.module#RecoveredModule'
  },
  {
    path: '**',
    loadChildren: './pages/home/home.module#HomeModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
