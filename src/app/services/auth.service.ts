import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiConstants } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  public getAccessToken(): Observable<any> {
    let headers = new HttpHeaders()
      .set(
        'Authorization',
        'Basic ' + btoa(environment.client_id + ':' + environment.client_secret)
      )
      .set('Content-Type', 'application/x-www-form-urlencoded');
    let payload = new HttpParams().set('grant_type', 'client_credentials');
    return this._http.post<any>(ApiConstants.SPOTIFY_TOKEN_API, payload, {
      headers: headers,
    });
  }

  public getJWTToken() {
    return localStorage.getItem('JWT_TOKEN');
  }
}
