import { createReducer, on } from '@ngrx/store';

import { AssetsState } from 'src/app/models/assets-state.model';
import * as assetsActions from '../actions/assets.actions';

export const initialState: AssetsState = {
  figures: {
    home: [],
    'view-base': [],
  },
  gifs: {
    home: [],
    'view-base': [],
  },
};

export const assetsReducer = createReducer(
  initialState,
  on(assetsActions.loadAssets, (state: AssetsState) => ({ ...state })),
  on(assetsActions.loadAssetsSuccess, (state: AssetsState, { assets }) => ({
    ...assets,
  })),
  on(assetsActions.loadAssetsFailure, (state) => {
    console.error('[assetsReducer] Load Assets action failed!');
    return { ...state };
  }),
);
