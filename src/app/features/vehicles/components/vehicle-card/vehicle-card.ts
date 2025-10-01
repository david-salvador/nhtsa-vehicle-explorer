import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Vehicle } from '../../store/models/vehicle-state.model';

@Component({
  selector: 'app-vehicle-card',
  standalone: false,
  templateUrl: './vehicle-card.html',
  styleUrl: './vehicle-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleCard {
  @Input() vehicle!: Vehicle;  // Requires new object reference to detect changes
  @Output() select = new EventEmitter<Vehicle>();

  onSelect(): void {
    this.select.emit(this.vehicle);
  }
}
