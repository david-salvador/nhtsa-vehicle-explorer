import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectSearchTerm } from '../../store/selectors/vehicle.selectors';
import { VehicleFacade } from '../../store/facades/vehicle.facade';
import { Vehicle } from '../../store/models/vehicle-state.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-list-page',
  templateUrl: './vehicle-list-page.html',
  styleUrl: './vehicle-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class VehicleListPage implements OnInit {

  private vehicleFacade: VehicleFacade = inject(VehicleFacade);
  private router: Router = inject(Router);
  // private store: Store = inject(Store);

  vehicles$ = this.vehicleFacade.vehicles$;
  loading$ = this.vehicleFacade.loading$;
  // searchTerm$ = this.store.select(selectSearchTerm);
  searchTerm$: Observable<string> = this.vehicleFacade.searchTerm$;
  error$: Observable<string | null> = this.vehicleFacade.error$;

  ngOnInit(): void {
    this.vehicleFacade.loadVehicles();
  }

  onSearchChange(searchTerm: string): void {
    this.vehicleFacade.setSearchTerm(searchTerm);
  }

  onVehicleSelect(vehicle: Vehicle): void {
    this.vehicleFacade.selectVehicle(vehicle.Make_ID);
    this.router.navigate(['/vehicles', vehicle.Make_ID]);
  }

  onRefresh(): void {
    this.vehicleFacade.refreshVehicles();
  }

  trackByMakeId(index: number, vehicle: Vehicle): number {
    return vehicle.Make_ID;
  }
}

// Presentational component - pure UI rendering
// @Component({
//   selector: 'app-vehicle-list',
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   template: `
//     <div *ngIf="loading" class="loading">Loading...</div>
    
//     <div class="vehicle-grid">
//       <app-vehicle-card
//         *ngFor="let vehicle of vehicles; trackBy: trackById"
//         [vehicle]="vehicle"
//         (select)="vehicleSelect.emit($event)">
//       </app-vehicle-card>
//     </div>
//   `
// })
// export class VehicleListComponent {
//   @Input() vehicles: Vehicle[] = [];
//   @Input() loading = false;
//   @Output() vehicleSelect = new EventEmitter<Vehicle>();

//   trackById(index: number, vehicle: Vehicle): number {
//     return vehicle.Make_ID;
//   }
// }