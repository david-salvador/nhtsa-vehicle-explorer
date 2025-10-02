import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandDetailPage } from './containers/brand-detail-page/brand-detail-page';

const routes: Routes = [
  {
    path: ':id',
    component: BrandDetailPage
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
