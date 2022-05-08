import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ZoomState } from './../../models/zoom-state.model';

export const selectZoomState = createFeatureSelector<ZoomState>('zoom');
export const selectZoomBreakpoints = () =>
  createSelector(selectZoomState, (state: ZoomState) => state.zoomBreakpoints);
