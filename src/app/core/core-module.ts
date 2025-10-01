import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { MainLayout } from './layout/main-layout/main-layout';



@NgModule({
  declarations: [
    Header,
    Footer,
    MainLayout
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Header,
    Footer,
    MainLayout
  ]
})
export class CoreModule { }
