import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing-module';
import { SharedModule } from '../../shared/shared-module';

import { BrandDetailPage } from './containers/brand-detail-page/brand-detail-page';
import { BrandInfo } from './components/brand-info/brand-info';
import { BrandStatistics } from './components/brand-statistics/brand-statistics';
import { VehiclesModule } from '../vehicles/vehicles-module';


@NgModule({
  declarations: [
    BrandDetailPage,
    BrandInfo,
    BrandStatistics
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    SharedModule,
    VehiclesModule
  ]
})
export class BrandsModule { }
