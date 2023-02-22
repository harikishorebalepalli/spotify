import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { AlbumElement, Response } from 'src/app/models/response.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchText: string = '';
  searchResults: { [key: string]: any } = {};
  searchEntities = ['Artists', 'Albums', 'Tracks'];
  latestReleases: AlbumElement[] = [];
  private readonly destroy$ = new Subject<void>();

  constructor(
    private _searchService: SearchService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRecommendations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public search(): void {
    if (!this.searchText.length) return;
    this._searchService
      .fetchQueryResults(this.searchText, 5)
      .pipe(catchError(this.handleError), takeUntil(this.destroy$))
      .subscribe((data: Response) => {
        this.searchResults['Artists'] = data?.artists?.items;
        this.searchResults['Albums'] = data?.albums.items;
        this.searchResults['Tracks'] = data?.tracks?.items;
      });
  }

  public getRecommendations() {
    this._searchService
      .fetchLatestReleases('US')
      .pipe(catchError(this.handleError), takeUntil(this.destroy$))
      .subscribe((res: Response) => {
        this.latestReleases = res?.albums?.items;
      });
  }

  public handleError(error: any) {
    this._toastr.error(error?.message, 'Error!');
    return of();
  }
}
