import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Vehicle, VehiclesState } from '../models/vehicle-state.model';
import * as VehicleActions from '../actions/vehicle.actions';

/**
 * The vehicle reducer implements EntityAdapter for normalized storage, enabling O(1) lookups by ID and eliminating duplicate data. The adapter pattern is critical for performance with large datasets—storing 10,000 vehicles as normalized entities rather than an array reduces memory overhead and enables efficient updates without mutating large arrays.
 */

export const vehicleAdapter: EntityAdapter<Vehicle> = createEntityAdapter<Vehicle>({
  selectId: (vehicle: Vehicle) => vehicle.Make_ID,
  sortComparer: false
});

export const initialState: VehiclesState = vehicleAdapter.getInitialState({
  loadStatus: 'NOT_LOADED' as const,
  selectedVehicleId: null,
  lastLoaded: null,
  searchTerm: '',
  error: null
});

export const vehicleReducer = createReducer(
  initialState,
  
  on(VehicleActions.loadVehicles, (state): VehiclesState => ({
    ...state,
    loadStatus: 'LOADING',
    error: null
  })),
  
  on(VehicleActions.loadVehiclesSuccess, (state, { vehicles, timestamp }): VehiclesState =>
    vehicleAdapter.setAll(vehicles, {
      ...state,
      loadStatus: 'LOADED',
      lastLoaded: timestamp,
      error: null
    })
  ),
  
  on(VehicleActions.loadVehiclesFailure, (state, { error }): VehiclesState =>
    vehicleAdapter.removeAll({
      ...state,
      loadStatus: 'NOT_LOADED',
      error
    })
  ),
  
  on(VehicleActions.setSearchTerm, (state, { searchTerm }): VehiclesState => ({
    ...state,
    searchTerm
  })),
  
  on(VehicleActions.selectVehicle, (state, { vehicleId }): VehiclesState => ({
    ...state,
    selectedVehicleId: vehicleId
  })),
  
  on(VehicleActions.invalidateCache, (state): VehiclesState => ({
    ...state,
    loadStatus: 'NOT_LOADED',
    lastLoaded: null
  }))
);