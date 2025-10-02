import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-vehicle-filter',
  templateUrl: './vehicle-filter.html',
  styleUrl: './vehicle-filter.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFilter {
  @Output() filterChange = new EventEmitter<string>();

  filters = ['All', 'Popular', 'Luxury', 'Commercial'];
  selectedFilter = 'All';

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.filterChange.emit(filter);
  }
}
