import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Brands } from './brands';

const routes: Routes = [{ path: '', component: Brands }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
