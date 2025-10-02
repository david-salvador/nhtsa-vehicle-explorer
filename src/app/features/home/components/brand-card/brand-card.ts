import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Vehicle } from '../../../vehicles/store/models/vehicle-state.model';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.html',
  styleUrls: ['./brand-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class BrandCard {
  @Input() brand!: Vehicle;
  @Output() select = new EventEmitter<Vehicle>();

  onSelect(): void {
    this.select.emit(this.brand);
  }
}