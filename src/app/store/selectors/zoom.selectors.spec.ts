import { initialState } from './../reducers/browser.reducer';
import { AppState } from './../../models/app-state.model';
import { initialState as bInitialState } from '../reducers/browser.reducer';
import { initialState as svInitialState } from '../reducers/splash-video.reducer';
import { initialState as figsInitialState } from '../reducers/figures.reducer';
import { initialState as zInitialState } from '../reducers/zoom.reducer';
import { ZoomState } from './../../models/zoom-state.model';
import { selectZoomState } from './zoom.selectors';

describe('Zoom Selectors', () => {
  const initialAppState: AppState = {
    browser: bInitialState,
    router: {
      state: {
        root: {
          params: {},
          data: {},
          url: [],
          outlet: 'primary',
          routeConfig: null,
          queryParams: {},
          fragment: null,
          children: [],
        },
        url: '/',
      },
      navigationId: 1,
    },
    splashVideo: svInitialState,
    figures: figsInitialState,
    zoom: zInitialState,
  };

  it('should select zoom state', () => {
    const result: ZoomState = selectZoomState.projector(initialAppState.zoom);

    expect(result).toEqual(initialAppState.zoom);
  });
});
