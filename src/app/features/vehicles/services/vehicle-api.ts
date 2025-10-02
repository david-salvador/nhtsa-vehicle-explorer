import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiClient } from '../../../core/services/api-client';
import { Vehicle, VehicleType, VehicleModel } from '../store/models/vehicle-state.model';


export interface NHTSAResponse<T> {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: T[];
}

export interface VehicleMake {
  Make_ID: number;
  Make_Name: string;
}


@Injectable({
  providedIn: 'root'
})
export class VehicleApi {
  private readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  constructor(private apiClient: ApiClient) { }

  getAllMakes(): Observable<Vehicle[]> {
    return this.apiClient.get<NHTSAResponse<Vehicle>>('GetAllMakes').pipe(
      map(response => response.Results),
      shareReplay(1)
    );
  }

  getModelsForMake(makeId: number): Observable<VehicleModel[]> {
    return this.apiClient.get<NHTSAResponse<VehicleModel>>(
      `GetModelsForMakeId/${makeId}`
    ).pipe(
      map(response => response.Results)
    );
  }

  getVehicleTypesForMake(makeName: string): Observable<VehicleType[]> {
    return this.apiClient.get<NHTSAResponse<VehicleType>>(
      `GetVehicleTypesForMake/${makeName}`
    ).pipe(
      map(response => response.Results)
    );
  }

  getModelsForMakeYear(make: string, year: number): Observable<VehicleModel[]> {
    return this.apiClient.get<NHTSAResponse<VehicleModel>>(
      `GetModelsForMakeYear/make/${make}/modelyear/${year}`
    ).pipe(
      map(response => response.Results)
    );
  }
}
