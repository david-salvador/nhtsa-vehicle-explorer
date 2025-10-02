import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiClient } from '../../../core/services/api-client';

export interface BrandDetails {
  Make_ID: number;
  Make_Name: string;
}

export interface NHTSABrandResponse<T> {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class BrandApiService {
  constructor(private apiClient: ApiClient) { }

  getBrandById(id: number): Observable<BrandDetails | null> {
    return this.apiClient.get<NHTSABrandResponse<BrandDetails>>('GetAllMakes').pipe(
      map(response => {
        const brand = response.Results.find(b => b.Make_ID === id);
        return brand || null;
      })
    );
  }
}