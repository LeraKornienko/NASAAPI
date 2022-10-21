import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterStateModel } from './model';

@Injectable({
  providedIn: 'root'
})
export class NasaApiService {

  NasaApiGetUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=11GKHZfeSNkMnT5uf8MfWc5xJJn70HAmfAAxjLet';

  constructor(private http: HttpClient,) { }

  private setParams(filters: FilterStateModel): HttpParams {
    let params = new HttpParams();

    if (filters.sol) {
      params = params.set('sol', filters.sol);
    }

    if (filters.camera) {
      params = params.set('camera', filters.camera);
    }

    if (filters.page) {
      params = params.set('page', filters.page);
    }

    return params;
  }

  GetPhotos(): Observable<any> {
    return this.http.get<any>(this.NasaApiGetUrl)

  }

  GetPhotosByParameters(filters: FilterStateModel): Observable<any> {
    const options = { params: this.setParams(filters) };
    return this.http.get<any>(this.NasaApiGetUrl, options);
  }
}
