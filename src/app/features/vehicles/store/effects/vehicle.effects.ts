// features/vehicles/store/effects/vehicle.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, timer } from 'rxjs';
import { 
  map, 
  catchError, 
  switchMap, 
  withLatestFrom, 
  filter,
  retryWhen,
  mergeMap,
  take
} from 'rxjs/operators';
import * as VehicleActions from '../actions/vehicle.actions';
import { VehicleApi } from '../../services/vehicle-api';
import { 
  selectVehiclesLoadStatus, 
  selectVehiclesLastLoaded 
} from '../selectors/vehicle.selectors';
import { environment } from '../../../../../environments/environment';
import { Vehicles } from '../../vehicles';
import { Vehicle, VehicleModel, VehicleType } from '../models/vehicle-state.model';
// import { VehicleModel, VehicleType } from '../../services/vehicle-api';

@Injectable()
export class VehicleEffects {
  private readonly CACHE_TTL = environment.cacheTTL; // 5 * 60 * 1000; 5 minutes
  private readonly MAX_RETRIES = 3;

  private actions$: Actions = inject(Actions);
  private store: Store = inject(Store);
  private vehicleApi: VehicleApi = inject(VehicleApi);

  // smart caching effect - only loads if cache invalid
  getVehicles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.loadVehicles),
      withLatestFrom(
        this.store.select(selectVehiclesLoadStatus),
        this.store.select(selectVehiclesLastLoaded)
      ),
      filter(([action, loadStatus, lastLoaded]) => {
        // Prevent duplicate requests if already loading
        if (loadStatus === 'LOADING') {
          return false;
        }
        
        // Load if not loaded yet
        if (loadStatus === 'NOT_LOADED') {
          return true;
        }
        
        // Check TTL - load if cache expired
        const now = Date.now();
        const cacheAge = now - (lastLoaded || 0);
        
        if (cacheAge > this.CACHE_TTL) {
          console.log(`Cache expired (age: ${Math.round(cacheAge / 1000)}s), refreshing`);
          return true;
        }
        
        // Cache hit - no need to load
        console.log(`Cache hit (age: ${Math.round(cacheAge / 1000)}s), using cached data`);
        return false;
      }),
      switchMap(() =>
        this.vehicleApi.getAllMakes().pipe(
          map((vehicles: Vehicle[]) => VehicleActions.loadVehiclesSuccess({
            vehicles,
            timestamp: Date.now()
          })),
          catchError(error => of(VehicleActions.loadVehiclesFailure({
            error: error.message || 'Failed to load vehicles'
          })))
        )
      )
    )
  );

  // Load vehicle types for selected make
  loadVehicleTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.loadVehicleTypes),
      switchMap(({ makeName }) =>
        this.vehicleApi.getVehicleTypesForMake(makeName).pipe(
          map((types: VehicleType[]) => VehicleActions.loadVehicleTypesSuccess({ types })),
          catchError(error => of(VehicleActions.loadVehicleTypesFailure({
            error: error.message || 'Failed to load vehicle types'
          })))
        )
      )
    )
  );

  // Load vehicles with exponential backoff retry
  loadVehicles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.loadVehicles),
      switchMap(() =>
        this.vehicleApi.getAllMakes().pipe(
          // Exponential backoff retry for transient failures
          retryWhen(errors =>
            errors.pipe(
              mergeMap((error, index) => {
                const retryAttempt = index + 1;
                
                // Don't retry on 4xx errors (client errors)
                // Skipping retries for 4xx errors prevents wasting resources on 
                // requests that will never succeed (authentication failures, not found errors).
                if (error.status >= 400 && error.status < 500) {
                  throw error;
                }
                
                // Max retries exceeded
                if (retryAttempt > this.MAX_RETRIES) {
                  throw error;
                }
                
                // Exponential backoff: 1s, 2s, 4s
                const delayMs = Math.pow(2, retryAttempt - 1) * 1000;
                console.log(`Retry attempt ${retryAttempt} after ${delayMs}ms`);
                
                return timer(delayMs);
              }),
              take(this.MAX_RETRIES)
            )
          ),
          map((vehicles: Vehicle[]) => VehicleActions.loadVehiclesSuccess({
            vehicles,
            timestamp: Date.now()
          })),
          catchError(error => of(VehicleActions.loadVehiclesFailure({
            error: error.message || 'Failed to load vehicles'
          })))
        )
      )
    )
  );

  // Load vehicle models for selected make
  loadVehicleModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.loadVehicleModels),
      switchMap(({ makeId }) =>
        this.vehicleApi.getModelsForMake(makeId).pipe(
          map((models: VehicleModel[]) => VehicleActions.loadVehicleModelsSuccess({ models })),
          catchError(error => of(VehicleActions.loadVehicleModelsFailure({
            error: error.message || 'Failed to load vehicle models'
          })))
        )
      )
    )
  );

  // constructor(
  //   private actions$: Actions,
  //   private store: Store,
  //   private vehicleApi: VehicleApi
  // ) {}
}