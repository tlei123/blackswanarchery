import { AppState } from './../../models/app-state.model';
import { initialState as bInitialState } from '../reducers/browser.reducer';
import { initialState as svInitialState } from '../reducers/splash-video.reducer';
import { initialState as zInitialState } from '../reducers/zoom.reducer';
import { Figure } from './../../models/figure.model';
import { FiguresState } from './../../models/figures-state.model';
import { initialState as gifsInitialState } from '../reducers/gifs.reducer';
import { selectFigures, selectFiguresByView } from './figures.selectors';

describe('Figures Selectors', () => {
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
    assets: {
      figures: {
        home: [
          {
            imageFilename: 'home-01.png',
            caption:
              'Arvid Danielson, Black Swan Archery Founder, President, & Bowyer',
            zoomable: true,
          },
        ],
        'view-base': [
          {
            imageFilename: 'view-base-01.png',
            zoomImageFilename: 'view-base-01-zoom.png',
            caption: 'String angle the same for bows with Modular System',
            zoomable: true,
          },
          {
            imageFilename: 'view-base-02.png',
            zoomImageFilename: 'view-base-02-zoom.png',
            caption:
              'Two new handle designs featuring wood scale grips with pewter Black Swan logo. One to be used with a whisker biscuit arrow rest, the other with a flipper rest and plunger',
            zoomable: true,
          },
          {
            imageFilename: 'view-base-03.png',
            zoomImageFilename: 'view-base-03-zoom.png',
            caption:
              '4 riser (handle) designs, including 2 new models for target and hunting that feature scale grips in a choice of hard woods, one designed for the whisker biscuit arrow rest, all with medium angle grips, and 4 unique high performance limb designs',
            zoomable: true,
          },
        ],
      },
      gifs: gifsInitialState,
    },
    zoom: zInitialState,
  };

  it('should select figures state', () => {
    const result: FiguresState = selectFigures.projector(
      initialAppState.figures,
    );

    expect(result.home).toEqual(initialAppState.figures.home);
    expect(result.view2).toEqual(initialAppState.figures.view2);
  });

  it('should select home figures state', () => {
    const selectHomeFigures = selectFiguresByView('home');
    const result: Figure[] = selectHomeFigures.projector(
      initialAppState.figures,
    );

    expect(result).toEqual(initialAppState.figures.home);
  });

  it('should select view2 figures state', () => {
    const selectHomeFigures = selectFiguresByView('view2');
    const result: Figure[] = selectHomeFigures.projector(
      initialAppState.figures,
    );

    expect(result).toEqual(initialAppState.figures.view2);
  });
});
