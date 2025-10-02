import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './material/material-module';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner';
import { ErrorMessage } from './components/error-message/error-message';
import { SearchInput } from './components/search-input/search-input';



@NgModule({
  declarations: [
    LoadingSpinner,
    ErrorMessage,
    SearchInput
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    LoadingSpinner,
    ErrorMessage,
    SearchInput
  ]
})
export class SharedModule { }
