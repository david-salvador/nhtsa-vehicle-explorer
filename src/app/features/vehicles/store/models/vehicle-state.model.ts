/**
 * 
  Smart caching with TTL and load status tracking
  The vehicle state model extends EntityState from @ngrx/entity, adding metadata for cache
  management. LoadStatus tracks three states: NOT_LOADED (initial), LOADING (in-flight request), 
  and LOADED (cached data available)—preventing duplicate requests and race conditions. The 
  lastLoaded timestamp enables time-to-live (TTL) cache invalidation after a configurable duration.
 */
import { EntityState } from '@ngrx/entity';

export interface Vehicle {
  Make_ID: number;
  Make_Name: string;
}

export interface VehicleType {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface VehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export type LoadStatus = 'NOT_LOADED' | 'LOADING' | 'LOADED';

export interface VehiclesState extends EntityState<Vehicle> {
  loadStatus: LoadStatus;
  selectedVehicleId: number | null;
  lastLoaded: number | null;
  searchTerm: string;
  error: string | null;
}

export interface VehicleDetailsState {
  types: VehicleType[];
  models: VehicleModel[];
  loadingTypes: boolean;
  loadingModels: boolean;
  errorTypes: string | null;
  errorModels: string | null;
}