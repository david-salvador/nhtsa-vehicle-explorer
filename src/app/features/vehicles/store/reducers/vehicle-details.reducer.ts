import { createReducer, on } from '@ngrx/store';
import { VehicleDetailsState } from '../models/vehicle-state.model';
import * as VehicleActions from '../actions/vehicle.actions';

export const initialDetailsState: VehicleDetailsState = {
  types: [],
  models: [],
  loadingTypes: false,
  loadingModels: false,
  errorTypes: null,
  errorModels: null
};

export const vehicleDetailsReducer = createReducer(
  initialDetailsState,
  
  on(VehicleActions.loadVehicleTypes, (state): VehicleDetailsState => ({
    ...state,
    loadingTypes: true,
    errorTypes: null
  })),
  
  on(VehicleActions.loadVehicleTypesSuccess, (state, { types }): VehicleDetailsState => ({
    ...state,
    types,
    loadingTypes: false,
    errorTypes: null
  })),
  
  on(VehicleActions.loadVehicleTypesFailure, (state, { error }): VehicleDetailsState => ({
    ...state,
    types: [],
    loadingTypes: false,
    errorTypes: error
  })),
  
  on(VehicleActions.loadVehicleModels, (state): VehicleDetailsState => ({
    ...state,
    loadingModels: true,
    errorModels: null
  })),
  
  on(VehicleActions.loadVehicleModelsSuccess, (state, { models }): VehicleDetailsState => ({
    ...state,
    models,
    loadingModels: false,
    errorModels: null
  })),
  
  on(VehicleActions.loadVehicleModelsFailure, (state, { error }): VehicleDetailsState => ({
    ...state,
    models: [],
    loadingModels: false,
    errorModels: error
  })),
  
  on(VehicleActions.clearVehicleDetails, (): VehicleDetailsState => initialDetailsState)
);