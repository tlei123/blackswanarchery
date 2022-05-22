import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private gifsUrl = '/data/gifs.json';

  constructor(private http: HttpClient) {}

  getGifs(): Observable<any> {
    return this.http
      .get<any>(this.gifsUrl)
      .pipe(catchError(this.handleError<any>('getGifs', {})));
  }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
