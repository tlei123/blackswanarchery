import { createAction, props } from '@ngrx/store';

export const loadFigures = createAction('[Figures] Load Figures');

export const loadFiguresSuccess = createAction(
  '[Figures] Load Figures Success',
  props<{ figures: any }>(),
);

export const loadFiguresFailure = createAction(
  '[Figures] Load Figures Failure',
  props<{ error: any }>(),
);
