import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Vehicle } from '../../../vehicles/store/models/vehicle-state.model';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.html',
  styleUrls: ['./brand-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class BrandList {
  @Input() brands: Vehicle[] | null = [];
  @Output() brandSelect = new EventEmitter<Vehicle>();

  onBrandSelect(brand: Vehicle): void {
    this.brandSelect.emit(brand);
  }

  trackByMakeId(index: number, brand: Vehicle): number {
    return brand.Make_ID;
  }
}