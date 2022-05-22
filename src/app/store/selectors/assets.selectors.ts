import { createFeatureSelector, createSelector, select } from '@ngrx/store';

import { AssetsState } from './../../models/assets-state.model';

export const selectAssets = createFeatureSelector<AssetsState>('assets');

// do NOT nest selectors below in another createSelector fn!

export const selectFiguresByView = (view: string) =>
  createSelector(selectAssets, (assets: AssetsState) => assets.figures[view]);

export const selectGifsByView = (view: string) =>
  createSelector(selectAssets, (assets: AssetsState) => assets.gifs[view]);
