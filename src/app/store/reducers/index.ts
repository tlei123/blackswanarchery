import { ActionReducerMap } from '@ngrx/store';
import { AppState } from 'src/app/models/app-state.model';
import { splashVideoReducer } from './splash-video.reducer';
import { routerReducer } from '@ngrx/router-store';

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  splashVideo: splashVideoReducer,
};
