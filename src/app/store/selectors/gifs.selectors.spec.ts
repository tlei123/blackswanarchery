import { AppState } from './../../models/app-state.model';
import { initialState as bInitialState } from '../reducers/browser.reducer';
import { initialState as svInitialState } from '../reducers/splash-video.reducer';
import { initialState as zInitialState } from '../reducers/zoom.reducer';
import { Gif } from 'src/app/models/gif.model';
import { GifsState } from 'src/app/models/gifs-state.model';
import { initialState as figsInitialState } from '../reducers/figures.reducer';
import { selectGifs, selectGifsByView } from './gifs.selectors';

describe('Gifs Selectors', () => {
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
    gifs: {
      home: [],
      'view-base': [
        {
          gifFilename: 'view-base-01.gif',
          thumbnailFilename: 'view-base-01.png',
          hoverMessagePaused: 'Click Play to start draw',
          hoverMessagePlaying: 'Click Stop to stop draw',
        },
        {
          gifFilename: 'view-base-02.gif',
          thumbnailFilename: 'view-base-02.png',
          hoverMessagePaused: 'Click Play to start rotation',
          hoverMessagePlaying: 'Click Stop to stop rotation',
        },
      ],
    },
    zoom: zInitialState,
  };

  it('should select gifs state', () => {
    const result: GifsState = selectGifs.projector(initialAppState.gifs);

    expect(result.home).toEqual(initialAppState.gifs.home);
    expect(result['view-base']).toEqual(initialAppState.gifs['view-base']);
  });

  it('should select home gifs state', () => {
    const selectHomeGifs = selectGifsByView('home');
    const result: Gif[] = selectHomeGifs.projector(initialAppState.gifs);

    expect(result).toEqual(initialAppState.gifs.home);
  });

  it('should select view-base gifs state', () => {
    const selectViewbaseGifs = selectGifsByView('view-base');
    const result: Gif[] = selectViewbaseGifs.projector(initialAppState.gifs);

    expect(result).toEqual(initialAppState.gifs['view-base']);
  });
});
