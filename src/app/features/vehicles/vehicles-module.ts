import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing-module';
import { Vehicles } from './vehicles';
import { VehicleListPage } from './containers/vehicle-list-page/vehicle-list-page';
import { VehicleDetailPage } from './containers/vehicle-detail-page/vehicle-detail-page';
import { VehicleCard } from './components/vehicle-card/vehicle-card';
import { VehicleFilter } from './components/vehicle-filter/vehicle-filter';
import { VehicleSearch } from './components/vehicle-search/vehicle-search';
import { VehicleTypeList } from './components/vehicle-type-list/vehicle-type-list';
import { VehicleModelList } from './components/vehicle-model-list/vehicle-model-list';


@NgModule({
  declarations: [
    Vehicles,
    VehicleListPage,
    VehicleDetailPage,
    VehicleCard,
    VehicleFilter,
    VehicleSearch,
    VehicleTypeList,
    VehicleModelList
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule
  ]
})
export class VehiclesModule { }
