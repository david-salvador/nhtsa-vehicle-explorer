import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { VehicleFacade } from '../../../vehicles/store/facades/vehicle.facade';
import { Vehicle } from '../../../vehicles/store/models/vehicle-state.model';


@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  private vehicleFacade: VehicleFacade = inject(VehicleFacade);
  searchControl = new FormControl('');
  vehicles$: Observable<Vehicle[]> = this.vehicleFacade.vehicles$;
  loading$: Observable<boolean> = this.vehicleFacade.loading$;
  error$: Observable<string | null> = this.vehicleFacade.error$;

  ngOnInit(): void {
    // Load vehicles from cache or API
    this.vehicleFacade.loadVehicles();
    
    // Set up search with debouncing
    this.searchControl.valueChanges.pipe(
      debounceTime(300),           // Wait 300ms after user stops typing
      distinctUntilChanged()       // Only emit if value actually changed
    ).subscribe(searchTerm => {
      this.vehicleFacade.setSearchTerm(searchTerm || '');
    });
  }

  trackByMakeId(index: number, vehicle: Vehicle): number {
    return vehicle.Make_ID;
  }

  onRefresh(): void {
    this.vehicleFacade.refreshVehicles();
  }
}