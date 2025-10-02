import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Vehicle } from '../../store/models/vehicle-state.model';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.html',
  styleUrl: './vehicle-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class VehicleCard {
  @Input() vehicle!: Vehicle;  // Requires new object reference to detect changes
  @Output() select = new EventEmitter<Vehicle>();

  onSelect(): void {
    this.select.emit(this.vehicle);
  }
}
