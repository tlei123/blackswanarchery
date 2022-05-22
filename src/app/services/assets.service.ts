import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AssetsService {
  private assetsUrl = '/data/assets.json';

  constructor(private http: HttpClient) {}

  getAssets(): Observable<any> {
    return this.http
      .get<any>(this.assetsUrl)
      .pipe(catchError(this.handleError<any>('getAssets', {})));
  }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
