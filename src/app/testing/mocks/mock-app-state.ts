import { AppState } from './../../models/app-state.model';

export const mockInitialAppState: AppState = {
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
    home: [],
    'view-base': [],
    view2: [],
  },
};
