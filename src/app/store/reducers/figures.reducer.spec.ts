import { figuresReducer, initialState } from './figures.reducer';
import { FiguresState } from '../../models/figures-state.model';
import * as figsActions from '../actions/figures.actions';
import * as figsJson from '../../../data/figures.json';

describe('Figures Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = figuresReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadFigures action', () => {
    it('should return previous state', () => {
      const action = figsActions.loadFigures();
      const state = figuresReducer(initialState, action);

      expect(state).toEqual(initialState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('loadFiguresSuccess', () => {
    it('should return new state with figures data', () => {
      const action = figsActions.loadFiguresSuccess({ figures: figsJson });
      const state = figuresReducer(initialState, action);
      const newState = { ...figsJson };

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
  describe('loadFiguresFailure', () => {
    it('should return previous state', () => {
      const action = figsActions.loadFiguresFailure({ error: 'error' });
      const state = figuresReducer(initialState, action);

      expect(state).toEqual(initialState);
      expect(state).not.toBe(initialState);
    });
  });
});
