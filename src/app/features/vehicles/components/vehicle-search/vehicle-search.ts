import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.html',
  styleUrl: './vehicle-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class VehicleSearch {
  @Output() searchChange = new EventEmitter<string>();

  onSearch(value: string): void {
    this.searchChange.emit(value);
  }
}
