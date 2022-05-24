import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AssetsService } from '@services/assets.service';

@Injectable()
export class AssetsEffects {
  loadAssets$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Assets] Load Assets'),
      mergeMap(() =>
        this.assetsSvc.getAssets().pipe(
          map((assets) => ({
            type: '[Assets] Load Assets Success',
            assets,
          })),
          catchError((err) => EMPTY),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private assetsSvc: AssetsService) {}
}
