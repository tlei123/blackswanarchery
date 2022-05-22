import { createReducer, on } from '@ngrx/store';

import { GifsState } from 'src/app/models/gifs-state.model';
import * as gifsActions from '../actions/gifs.actions';

export const initialState: GifsState = {
  home: [],
  'view-base': [],
};

export const gifsReducer = createReducer(
  initialState,
  on(gifsActions.loadGifs, (state: GifsState) => ({ ...state })),
  on(gifsActions.loadGifsSuccess, (state: GifsState, { gifs }) => ({
    ...gifs,
  })),
  on(gifsActions.loadGifsFailure, (state) => {
    console.error('[gifsReducer] Load Gifs action failed!');
    return { ...state };
  }),
);
