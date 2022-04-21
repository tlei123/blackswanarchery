import { AppState } from './../../models/app-state.model';
import { initialState as bInitialState } from '../reducers/browser.reducer';
import { initialState as svInitialState } from '../reducers/splash-video.reducer';
import { initialState as figsInitialState } from '../reducers/figures.reducer';
import { selectCurrentBreakpoint } from './browser.selectors';

describe('Browser Selectors', () => {
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
  };

  it('should select browser state', () => {
    const selectCurrBrkpt = selectCurrentBreakpoint();
    const result: string = selectCurrBrkpt.projector(initialAppState.browser);

    expect(result).toEqual('xs');
  });
});
