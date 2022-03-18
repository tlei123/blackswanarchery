import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FiguresService {
  private figuresUrl = '/data/figures.json';

  constructor(private http: HttpClient) {}

  getFigures(): Observable<any> {
    return this.http
      .get<any>(this.figuresUrl)
      .pipe(catchError(this.handleError<any>('getFigures', {})));
  }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
