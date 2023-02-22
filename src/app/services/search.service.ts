import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../constants/api.constants';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  public fetchQueryResults(
    searchText: string,
    limit: number
  ): Observable<Response> {
    let url = `${ApiConstants.SPOTIFY_QUERY_API}?q=${searchText}&type=track,artist,album&limit=${limit}`;
    return this.http.get<Response>(url);
  }

  public fetchLatestReleases(countryCode: string) {
    let url = `${ApiConstants.SPOTIFY_LATEST_RELEASES_API}?country=${countryCode}`;
    return this.http.get<any>(url);
  }
}
