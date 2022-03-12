import { on } from '@ngrx/store';

import { SplashVideoState } from './../../models/splash-video-state.model';
import * as svActions from '../actions/splash-video.actions';
import { createRehydrateReducer } from '../../utils/create-rehydrated-reducer';

export const initialState: SplashVideoState = {
  done: false,
};

export const splashVideoReducer = createRehydrateReducer(
  'bsa_splash_video_state',
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
