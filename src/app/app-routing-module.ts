import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/home/home-module')
      .then(m => m.HomeModule)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./features/vehicles/vehicles-module')
      .then(m => m.VehiclesModule)
  },
  {
    path: 'brands',
    loadChildren: () => import('./features/brands/brands-module')
      .then(m => m.BrandsModule)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
