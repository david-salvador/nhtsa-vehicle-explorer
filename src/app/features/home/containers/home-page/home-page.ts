import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VehicleFacade } from '../../../vehicles/store/facades/vehicle.facade';
import { Vehicle } from '../../../vehicles/store/models/vehicle-state.model';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  private vehicleFacade: VehicleFacade = inject(VehicleFacade);
  private router: Router = inject(Router);

  vehicles$: Observable<Vehicle[]> = this.vehicleFacade.vehicles$;
  loading$: Observable<boolean> = this.vehicleFacade.loading$;
  error$: Observable<string | null> = this.vehicleFacade.error$;
  searchTerm$: Observable<string> = this.vehicleFacade.searchTerm$;
  cacheStatus$ = this.vehicleFacade.cacheStatus$;

  ngOnInit(): void {
    this.vehicleFacade.loadVehicles();
  }

  onSearchChange(searchTerm: string): void {
    this.vehicleFacade.setSearchTerm(searchTerm);
  }

  onBrandSelect(vehicle: Vehicle): void {
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