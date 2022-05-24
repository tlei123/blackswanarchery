import { on } from '@ngrx/store';

import { SplashVideoState } from '@models/splash-video-state.model';
import * as svActions from '@store/actions/splash-video.actions';
import { createRehydrateReducer } from '@utils/index';

export const initialState: SplashVideoState = {
  done: false,
};

export const splashVideoReducer = createRehydrateReducer(
  'bsa_splash_video_state',
  initialState,
  on(svActions.finish, (state) => ({
    ...state,
    done: true,
  })),
  on(svActions.reset, (state) => ({
    ...state,
    done: false,
  })),
);
