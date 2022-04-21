import { createReducer, on } from '@ngrx/store';

import { BrowserState } from 'src/app/models/browser-state.model';
import * as browserActions from '../actions/browser.actions';

export const initialState: BrowserState = {
  currentBreakpoint: 'xs',
};

export const browserReducer = createReducer(
  initialState,
  on(
    browserActions.changeBreakpoint,
    (state: BrowserState, { breakpoint }) => ({
      ...state,
      currentBreakpoint: breakpoint,
    }),
  ),
);
