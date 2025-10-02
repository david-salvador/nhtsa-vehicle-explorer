import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NHTSAResponse } from '../../features/vehicles/services/vehicle-api';
import { Vehicle } from '../../features/vehicles/store/models/vehicle-state.model';


@Injectable({
  providedIn: 'root'
})
export class ApiClient {
   private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, params?: any): Observable<T> {
    const httpParams = this.buildParams(params);


    // if (endpoint === 'GetAllMakes') { 
    //   return this.mockGet() as Observable<T>;
    // }
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams });
  }

  private buildParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    
    // Always add format=json
    httpParams = httpParams.set('format', 'json');
    
    return httpParams;
  }

  private mockGet(): Observable<NHTSAResponse<Vehicle>> {
    const returnBrands = {
      "Count": 11980,
      "Message": "Response returned successfully",
      "SearchCriteria": null,
      "Results": [
        {
            "Make_ID": 6001,
            "Make_Name": "BUD ANTLE INC"
        },
        {
            "Make_ID": 590,
            "Make_Name": "BUELL"
        },
        {
            "Make_ID": 446,
            "Make_Name": "BUELL (EBR)"
        },
        {
            "Make_ID": 961,
            "Make_Name": "BUFFALO CHOPPERS"
        },
        {
            "Make_ID": 4703,
            "Make_Name": "BUFFALO TRAILER MANUFACTURING"
        },
        {
            "Make_ID": 8068,
            "Make_Name": "BUFFALO TRUCK EQUIPERS, INC"
        },
        {
            "Make_ID": 7425,
            "Make_Name": "BUG MOTORS"
        },
        {
            "Make_ID": 454,
            "Make_Name": "BUGATTI"
        }
      ]
  };
    return of(returnBrands);
  }
}
