import { ActionReducerMap } from '@ngrx/store';

import { AppState } from 'src/app/models/app-state.model';
import { browserReducer } from './browser.reducer';
import { splashVideoReducer } from './splash-video.reducer';
import { routerReducer } from '@ngrx/router-store';
import { assetsReducer } from './assets.reducer';
import { zoomReducer } from './zoom.reducer';

export const reducers: ActionReducerMap<AppState> = {
  browser: browserReducer,
  router: routerReducer,
  splashVideo: splashVideoReducer,
  assets: assetsReducer,
  zoom: zoomReducer,
};
