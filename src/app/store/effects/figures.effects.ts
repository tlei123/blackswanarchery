import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FiguresService } from './../../services/figures.service';

@Injectable()
export class FiguresEffects {
  loadFigures$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Figures] Load Figures'),
      mergeMap(() =>
        this.figuresSvc.getFigures().pipe(
          map((figures) => ({
            type: '[Figures] Load Figures Success',
            figures,
          })),
          catchError((err) => EMPTY),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private figuresSvc: FiguresService) {}
}
