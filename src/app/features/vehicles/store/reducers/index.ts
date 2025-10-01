import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { VehiclesState, VehicleDetailsState } from '../models/vehicle-state.model';
import { vehicleReducer } from './vehicle.reducer';
import { vehicleDetailsReducer } from './vehicle-details.reducer';

export interface VehicleModuleState {
  vehicles: VehiclesState;
  vehicleDetails: VehicleDetailsState;
}

export const vehicleReducers: ActionReducerMap<VehicleModuleState> = {
  vehicles: vehicleReducer,
  vehicleDetails: vehicleDetailsReducer
};

export const selectVehicleModuleState = createFeatureSelector<VehicleModuleState>('vehicleModule');
