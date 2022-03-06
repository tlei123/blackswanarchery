import { Action, createReducer, on } from '@ngrx/store';

import { SplashVideoState } from './../../models/splash-video-state.model';
import * as svActions from '../actions/splash-video.actions';

export const initialState: SplashVideoState = {
  done: false,
};

export const splashVideoReducer = createReducer(
  initialState,
  on(svActions.close, (state) => ({
    ...state,
    done: true,
  })),
  on(svActions.end, (state) => ({
    ...state,
    done: true,
  })),
  on(svActions.skip, (state) => ({
    ...state,
    done: true,
  })),
  on(svActions.reset, (state) => ({
    ...state,
    done: false,
  })),
);
