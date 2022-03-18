import { Action, createReducer, on } from '@ngrx/store';

import { FiguresState } from 'src/app/models/figures-state.model';
import * as figsActions from '../actions/figures.actions';

export const initialState: FiguresState = {
  home: [],
  view2: [],
};

export const figuresReducer = createReducer(
  initialState,
  on(figsActions.loadFigures, (state: FiguresState) => state),
  on(figsActions.loadFiguresSuccess, (state: FiguresState, { figures }) => ({
    ...figures,
  })),
  on(figsActions.loadFiguresFailure, (state) => {
    console.error('[figuresReducer] Load Figures action failed!');
    return state;
  }),
);
