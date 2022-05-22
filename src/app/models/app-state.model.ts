import { RouterReducerState } from '@ngrx/router-store';

import { BrowserState } from './browser-state.model';
import { SplashVideoState } from './splash-video-state.model';
import { AssetsState } from './assets-state.model';
import { ZoomState } from './zoom-state.model';

export interface AppState {
  browser: BrowserState;
  router: RouterReducerState<any>;
  splashVideo: SplashVideoState;
  assets: AssetsState;
  zoom: ZoomState;
}
