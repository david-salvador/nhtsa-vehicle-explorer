import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VehicleType } from '../../store/models/vehicle-state.model';

@Component({
  selector: 'app-vehicle-type-list',
  templateUrl: './vehicle-type-list.html',
  styleUrl: './vehicle-type-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class VehicleTypeList {
  @Input() types: VehicleType[] | null = [];

  trackByTypeId(index: number, type: VehicleType): number {
    return type.VehicleTypeId;
  }
}
