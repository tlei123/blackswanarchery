import { createAction, props } from '@ngrx/store';

export const loadGifs = createAction('[Gifs] Load Gifs');

export const loadGifsSuccess = createAction(
  '[Gifs] Load Gifs Success',
  props<{ gifs: any }>(),
);

export const loadGifsFailure = createAction(
  '[Gifs] Load Gifs Failure',
  props<{ error: any }>(),
);
