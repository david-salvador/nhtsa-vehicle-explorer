import { createAction, props } from '@ngrx/store';
import { Vehicle, VehicleType, VehicleModel } from '../models/vehicle-state.model';

// Vehicle List Actions
export const loadVehicles = createAction('[Vehicles/API] Load Vehicles');

export const loadVehiclesSuccess = createAction(
  '[Vehicles/API] Load Vehicles Success',
  props<{ vehicles: Vehicle[]; timestamp: number }>()
);

export const loadVehiclesFailure = createAction(
  '[Vehicles/API] Load Vehicles Failure',
  props<{ error: string }>()
);

export const setSearchTerm = createAction(
  '[Vehicles/Page] Set Search Term',
  props<{ searchTerm: string }>()
);

export const selectVehicle = createAction(
  '[Vehicles/Page] Select Vehicle',
  props<{ vehicleId: number }>()
);

export const invalidateCache = createAction('[Vehicles/Page] Invalidate Cache');

// Vehicle Details Actions
export const loadVehicleTypes = createAction(
  '[Vehicle Details/API] Load Vehicle Types',
  props<{ makeName: string }>()
);

export const loadVehicleTypesSuccess = createAction(
  '[Vehicle Details/API] Load Vehicle Types Success',
  props<{ types: VehicleType[] }>()
);

export const loadVehicleTypesFailure = createAction(
  '[Vehicle Details/API] Load Vehicle Types Failure',
  props<{ error: string }>()
);

export const loadVehicleModels = createAction(
  '[Vehicle Details/API] Load Vehicle Models',
  props<{ makeId: number }>()
);

export const loadVehicleModelsSuccess = createAction(
  '[Vehicle Details/API] Load Vehicle Models Success',
  props<{ models: VehicleModel[] }>()
);

export const loadVehicleModelsFailure = createAction(
  '[Vehicle Details/API] Load Vehicle Models Failure',
  props<{ error: string }>()
);

export const clearVehicleDetails = createAction('[Vehicle Details/Page] Clear Details');
