import { RouterReducerState } from '@ngrx/router-store';

import { BrowserState } from './browser-state.model';
import { SplashVideoState } from './splash-video-state.model';
import { FiguresState } from './figures-state.model';

export interface AppState {
  browser: BrowserState;
  router: RouterReducerState<any>;
  splashVideo: SplashVideoState;
  figures: FiguresState;
}
