import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './material/material-module';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner';
import { ErrorMessage } from './components/error-message/error-message';
import { SearchInput } from './components/search-input/search-input';
import { FilterPipe } from './pipes/filter-pipe';
import { HighlightPipe } from './pipes/highlight-pipe';
import { DebounceClick } from './directives/debounce-click';



@NgModule({
  declarations: [
    LoadingSpinner,
    ErrorMessage,
    SearchInput,
    FilterPipe,
    HighlightPipe,
    DebounceClick
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
    SearchInput,
    FilterPipe,
    HighlightPipe,
    DebounceClick
  ]
})
export class SharedModule { }
