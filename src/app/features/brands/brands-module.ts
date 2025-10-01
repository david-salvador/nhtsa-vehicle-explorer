import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing-module';
import { Brands } from './brands';
import { BrandDetailPage } from './containers/brand-detail-page/brand-detail-page';
import { BrandInfo } from './components/brand-info/brand-info';
import { BrandStatistics } from './components/brand-statistics/brand-statistics';


@NgModule({
  declarations: [
    Brands,
    BrandDetailPage,
    BrandInfo,
    BrandStatistics
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule
  ]
})
export class BrandsModule { }
