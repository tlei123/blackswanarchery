import { Action, createReducer, on } from '@ngrx/store';

import * as appActions from '../actions/app.actions';

export const initialAppState = {
  splashVideoDone: false,
};

const _appReducer = createReducer(
  initialAppState,
  on(appActions.closeSplashVideo, (state) => ({
    ...state,
    splashVideoDone: true,
  })),
  on(appActions.endSplashVideo, (state) => ({
    ...state,
    splashVideoDone: true,
  })),
  on(appActions.skipSplashVideo, (state) => ({
    ...state,
    splashVideoDone: true,
  })),
  on(appActions.resetSplashVideo, (state) => ({
    ...state,
    splashVideoDone: false,
  }))
);

export function appReducer(state, action: Action) {
  return _appReducer(state, action);
}
