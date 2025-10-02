import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing-module';
import { SharedModule } from '../../shared/shared-module';

import { HomePage } from './containers/home-page/home-page';
import { BrandList } from './components/brand-list/brand-list';
import { BrandCard } from './components/brand-card/brand-card';
import { BrandSearch } from './components/brand-search/brand-search';


@NgModule({
  declarations: [
    HomePage,
    BrandList,
    BrandCard,
    BrandSearch
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
