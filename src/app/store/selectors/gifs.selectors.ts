import { createFeatureSelector, createSelector, select } from '@ngrx/store';

import { GifsState } from './../../models/gifs-state.model';

export const selectGifs = createFeatureSelector<GifsState>('gifs');

// do NOT nest selectGifsByView in another createSelector fn!
export const selectGifsByView = (view: string) =>
  createSelector(selectGifs, (gifs: GifsState) => gifs[view]);
