import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { GifsService } from './../../services/gifs.service';

@Injectable()
export class GifsEffects {
  loadGifs$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Gifs] Load Gifs'),
      mergeMap(() =>
        this.gifsSvc.getGifs().pipe(
          map((gifs) => ({
            type: '[Gifs] Load Gifs Success',
            gifs,
          })),
          catchError((err) => EMPTY),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private gifsSvc: GifsService) {}
}
