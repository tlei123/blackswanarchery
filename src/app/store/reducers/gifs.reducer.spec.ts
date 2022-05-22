import { gifsReducer, initialState } from './gifs.reducer';
import * as gifsActions from './../actions/gifs.actions';
import * as gifsJson from './../../../data/gifs.json';

describe('Gifs Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = gifsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadGifs action', () => {
    it('should return previous state', () => {
      const action = gifsActions.loadGifs();
      const state = gifsReducer(initialState, action);

      expect(state).toEqual(initialState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('loadGifsSuccess', () => {
    it('should return new state with figures data', () => {
      const action = gifsActions.loadGifsSuccess({ gifs: gifsJson });
      const state = gifsReducer(initialState, action);
      const newState = { ...gifsJson };

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
  describe('loadGifsFailure', () => {
    it('should return previous state', () => {
      const action = gifsActions.loadGifsFailure({ error: 'error' });
      const state = gifsReducer(initialState, action);

      expect(state).toEqual(initialState);
      expect(state).not.toBe(initialState);
    });
  });
});
