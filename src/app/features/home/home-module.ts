import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing-module';
import { Home } from './home';
import { HomePage } from './containers/home-page/home-page';
import { BrandList } from './components/brand-list/brand-list';
import { BrandCard } from './components/brand-card/brand-card';
import { BrandSearch } from './components/brand-search/brand-search';


@NgModule({
  declarations: [
    Home,
    HomePage,
    BrandList,
    BrandCard,
    BrandSearch
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
