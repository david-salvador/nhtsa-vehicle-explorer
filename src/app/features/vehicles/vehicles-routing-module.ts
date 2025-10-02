import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Vehicles } from './vehicles';

// const routes: Routes = [{ path: '', component: Vehicles }];

import { VehicleListPage } from './containers/vehicle-list-page/vehicle-list-page';
import { VehicleDetailPage } from './containers/vehicle-detail-page/vehicle-detail-page';

const routes: Routes = [
  {
    path: '',
    component: VehicleListPage
  },
  {
    path: ':id',
    component: VehicleDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
