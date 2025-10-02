// features/vehicles/store/facades/vehicle.facade.ts
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as VehicleActions from '../actions/vehicle.actions';
import * as VehicleSelectors from '../selectors/vehicle.selectors';
import { Vehicle, VehicleType, VehicleModel } from '../models/vehicle-state.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleFacade {
  private store: Store = inject(Store);
  // Vehicle list observables
  vehicles$ = this.store.select(VehicleSelectors.selectFilteredVehicles);
  allVehicles$ = this.store.select(VehicleSelectors.selectAllVehicles);
  loading$ = this.store.select(VehicleSelectors.selectIsLoading);
  loaded$ = this.store.select(VehicleSelectors.selectIsLoaded);
  error$ = this.store.select(VehicleSelectors.selectVehiclesError);
  cacheStatus$ = this.store.select(VehicleSelectors.selectCacheStatus);
  searchTerm$ = this.store.select(VehicleSelectors.selectSearchTerm);
  selectedVehicle$:Observable<Vehicle | null | undefined> = this.store.select(VehicleSelectors.selectSelectedVehicle);

  // Vehicle details observables
  vehicleTypes$ = this.store.select(VehicleSelectors.selectVehicleTypes);
  vehicleModels$ = this.store.select(VehicleSelectors.selectVehicleModels);
  loadingTypes$ = this.store.select(VehicleSelectors.selectLoadingTypes);
  loadingModels$ = this.store.select(VehicleSelectors.selectLoadingModels);
  errorTypes$ = this.store.select(VehicleSelectors.selectErrorTypes);
  errorModels$ = this.store.select(VehicleSelectors.selectErrorModels);

  // Action dispatchers
  // Vehicle list actions
  loadVehicles(): void {
    this.store.dispatch(VehicleActions.loadVehicles());
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(VehicleActions.setSearchTerm({ searchTerm }));
  }

  selectVehicle(vehicleId: number): void {
    this.store.dispatch(VehicleActions.selectVehicle({ vehicleId }));
  }

  invalidateCache(): void {
    this.store.dispatch(VehicleActions.invalidateCache());
  }

  refreshVehicles(): void {
    this.invalidateCache();
    this.loadVehicles();
  }

  // Vehicle details actions
  loadVehicleTypes(makeName: string): void {
    this.store.dispatch(VehicleActions.loadVehicleTypes({ makeName }));
  }

  loadVehicleModels(makeId: number): void {
    this.store.dispatch(VehicleActions.loadVehicleModels({ makeId }));
  }

  clearVehicleDetails(): void {
    this.store.dispatch(VehicleActions.clearVehicleDetails());
  }
}