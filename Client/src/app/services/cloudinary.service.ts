import { Injectable } from '@angular/core';
import { Cloudinary } from '@cloudinary/url-gen';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  constructor(private http: HttpClient) {}

  uploadImage(data: any): Observable<any> {
    let url = 'https://api.cloudinary.com/v1_1/dklzco9qq/image/upload';
    return this.http.post(url, data);
  }
}
