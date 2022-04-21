import { createFeatureSelector, createSelector, select } from '@ngrx/store';

import { BrowserState } from './../../models/browser-state.model';

export const selectBrowserState =
  createFeatureSelector<BrowserState>('browser');

// do NOT nest selectCurrentBreakpoint in another createSelector fn!
export const selectCurrentBreakpoint = () =>
  createSelector(
    selectBrowserState,
    (browser: BrowserState) => browser.currentBreakpoint,
  );
