import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Vehicle, VehicleType, VehicleModel } from '../../../vehicles/store/models/vehicle-state.model';

interface Statistics {
  totalTypes: number;
  totalModels: number;
  uniqueModelNames: number;
}


@Component({
  selector: 'app-brand-statistics',
  standalone: false,
  templateUrl: './brand-statistics.html',
  styleUrl: './brand-statistics.scss'
})
export class BrandStatistics {
  @Input() brand: Vehicle | null = null;
  @Input() types: VehicleType[] | null = [];
  @Input() models: VehicleModel[] | null = [];

  statistics: Statistics = {
    totalTypes: 0,
    totalModels: 0,
    uniqueModelNames: 0
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['types'] || changes['models']) {
      this.calculateStatistics();
    }
  }

  private calculateStatistics(): void {
    this.statistics = {
      totalTypes: this.types?.length || 0,
      totalModels: this.models?.length || 0,
      uniqueModelNames: this.getUniqueModelNames()
    };
  }

  private getUniqueModelNames(): number {
    if (!this.models) return 0;
    
    const uniqueNames = new Set(
      this.models.map(m => m.Model_Name.toLowerCase().trim())
    );
    return uniqueNames.size;
  }
}
