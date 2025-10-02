import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-brand-search',
  templateUrl: './brand-search.html',
  styleUrls: ['./brand-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class BrandSearch {
  @Output() searchChange = new EventEmitter<string>();

  onSearch(value: string): void {
    this.searchChange.emit(value);
  }
}