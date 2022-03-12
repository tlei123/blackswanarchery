import { RouterReducerState } from '@ngrx/router-store';

import { SplashVideoState } from './splash-video-state.model';

export interface AppState {
  router: RouterReducerState<any>;
  splashVideo: SplashVideoState;
}
