import { createAction, props } from '@ngrx/store';

export const loadAssets = createAction('[Assets] Load Assets');

export const loadAssetsSuccess = createAction(
  '[Assets] Load Assets Success',
  props<{ assets: any }>(),
);

export const loadAssetsFailure = createAction(
  '[Assets] Load Assets Failure',
  props<{ error: any }>(),
);
