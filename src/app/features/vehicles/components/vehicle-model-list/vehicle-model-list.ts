import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { VehicleModel } from '../../store/models/vehicle-state.model';
@Component({
  selector: 'app-vehicle-model-list',
  templateUrl: './vehicle-model-list.html',
  styleUrl: './vehicle-model-list.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleModelList {
  @Input() models: VehicleModel[] | null = [];

  trackByModelId(index: number, model: VehicleModel): number {
    return model.Model_ID;
  }
}
