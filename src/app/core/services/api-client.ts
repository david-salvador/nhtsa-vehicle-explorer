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


    if (endpoint === 'GetAllMakes') { 
      return this.mockGet() as Observable<T>;
    }
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
          "Make_ID": 12858,
          "Make_Name": "#1 ALPINE CUSTOMS"
        },
        {
          "Make_ID": 4877,
          "Make_Name": "1\/OFF KUSTOMS, LLC"
        },
        {
          "Make_ID": 11257,
          "Make_Name": "102 IRONWORKS, INC."
        },
        {
          "Make_ID": 12255,
          "Make_Name": "12832429 CANADA INC."
        },
        {
          "Make_ID": 13053,
          "Make_Name": "137 INDUSTRIES INC."
        },
        {
          "Make_ID": 6387,
          "Make_Name": "17 CREEK ENTERPRISES"
        },
        {
          "Make_ID": 12948,
          "Make_Name": "1955 CUSTOM BELAIR"
        },
        {
          "Make_ID": 9172,
          "Make_Name": "1M CUSTOM CAR TRANSPORTS, INC."
        },
        {
          "Make_ID": 6124,
          "Make_Name": "1ST CHOICE MANUFACTURING INC"
        },
        {
          "Make_ID": 94877,
          "Make_Name": "aaaaaa 1\/OFF KUSTOMS, LLC"
        },
        {
          "Make_ID": 911257,
          "Make_Name": "102 IRONWORKS, INC."
        },
        {
          "Make_ID": 912255,
          "Make_Name": "12832429 CANADA INC."
        },
        {
          "Make_ID": 913053,
          "Make_Name": "137 INDUSTRIES INC."
        },
        {
          "Make_ID": 96387,
          "Make_Name": "17 CREEK ENTERPRISES"
        },
        {
          "Make_ID": 912948,
          "Make_Name": "1955 CUSTOM BELAIR"
        },
        {
          "Make_ID": 99172,
          "Make_Name": "1M CUSTOM CAR TRANSPORTS, INC."
        },
        {
          "Make_ID": 96124,
          "Make_Name": "1ST CHOICE MANUFACTURING INC"
        },
      ]
  };
    return of(returnBrands);
  }
}
