import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  api_key: String = 'AIzaSyBK4TUoOfF9msUqjyUpgEYFk6MPjGoSu7E';
  base_url = 'https://localhost:3000';
  endpoint = `/maps/api/place/autocomplete/json?input=`;

  constructor(private http: HttpClient) {}

  //Search location with interceptor
  searchLocation(query: string): Observable<any> {
    return this.http.get(
      `${this.base_url}${this.endpoint}${query}&key=${this.api_key}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true', // Required for cookies, authorization headers with HTTPS
          'Access-Control-Allow-Headers':
            'Content-Type,Accept,Access-Control-Allow-Origin', // Required for cookies, authorization headers with HTTPS
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Expose-Headers': 'x-auth-token', // Required for cookies, authorization headers with HTTPS
        },
      }
    );
  }
}
