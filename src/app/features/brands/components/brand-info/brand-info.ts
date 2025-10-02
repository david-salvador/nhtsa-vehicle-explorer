import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Vehicle } from '../../../vehicles/store/models/vehicle-state.model';

@Component({
  selector: 'app-brand-info',
  templateUrl: './brand-info.html',
  styleUrl: './brand-info.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandInfo {
  @Input() brand: Vehicle | null = null;
}
