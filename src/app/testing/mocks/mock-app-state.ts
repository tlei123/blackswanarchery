import { AppState } from './../../models/app-state.model';

export const mockInitialAppState: AppState = {
  browser: {
    currentBreakpoint: 'xs',
  },
  router: {
    state: {
      root: {
        children: [],
        data: {},
        outlet: 'primary',
        params: {},
        queryParams: {},
        url: [],
      },
      url: '/',
    },
    navigationId: 1,
  },
  splashVideo: {
    done: false,
  },
  figures: {
    home: [
      {
        imageFilename: 'home-01.png',
        caption:
          'Arvid Danielson, Black Swan Archery Founder, President, & Bowyer',
        zoomable: true,
      },
    ],
    view2: [
      {
        imageFilename: 'view2-01.png',
        imageFilename2x: 'view2-01-497x882.png',
        caption: 'String angle the same for bows with Modular System',
        zoomable: true,
      },
      {
        imageFilename: 'view2-02.png',
        imageFilename2x: 'view2-02-2x.png',
        caption:
          'Two new handle designs featuring wood scale grips with pewter Black Swan logo. One to be used with a whisker biscuit arrow rest, the other with a flipper rest and plunger',
        zoomable: true,
      },
      {
        imageFilename: 'view2-03.png',
        imageFilename2x: 'view2-03-2x.png',
        caption:
          '4 riser (handle) designs, including 2 new models for target and hunting that feature scale grips in a choice of hard woods, one designed for the whisker biscuit arrow rest, all with medium angle grips, and 4 unique high performance limb designs',
        zoomable: true,
      },
    ],
    'view-base': [
      {
        imageFilename: 'view-base-01.png',
        caption: 'String angle the same for bows with Modular System',
        zoomable: true,
      },
      {
        imageFilename: 'view-base-02.png',
        caption:
          'Two new handle designs featuring wood scale grips with pewter Black Swan logo. One to be used with a whisker biscuit arrow rest, the other with a flipper rest and plunger',
        zoomable: true,
      },
      {
        imageFilename: 'view-base-03.png',
        caption:
          '4 riser (handle) designs, including 2 new models for target and hunting that feature scale grips in a choice of hard woods, one designed for the whisker biscuit arrow rest, all with medium angle grips, and 4 unique high performance limb designs',
        zoomable: true,
      },
    ],
  },
  zoom: {
    currentImageFilename: '',
    currentViewImagesSubdir: '',
    currentViewZoomableFigures: [],
    isOpen: false,
  },
};
