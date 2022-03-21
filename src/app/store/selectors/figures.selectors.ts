import { createFeatureSelector, createSelector, select } from '@ngrx/store';

import { FiguresState } from './../../models/figures-state.model';

export const selectFigures = createFeatureSelector<FiguresState>('figures');

export const selectFiguresByView = (view: string) =>
  createSelector(selectFigures, (figures: FiguresState) => figures[view]);
