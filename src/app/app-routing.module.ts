import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'casos-confirmados',
    loadChildren: () => import('./pages/confirmed/confirmed.module').then(mod => mod.ConfirmedModule)
  },
  {
    path: 'casos-activos',
    loadChildren: () => import('./pages/actives/actives.module').then(mod => mod.ActivesModule)
  },
  {
    path: 'fallecidos',
    loadChildren: () => import('./pages/deaths/deaths.module').then(mod => mod.DeathsModule)
  },
  {
    path: 'recuperados',
    loadChildren: () => import('./pages/recovered/recovered.module').then(mod => mod.RecoveredModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
