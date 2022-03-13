import * as fromReducer from './splash-video.reducer';
import * as fromActions from '../actions/splash-video.actions';
import { SplashVideoState } from './../../models/splash-video-state.model';

describe('SplashVideoReducer', () => {
  describe('unknown action', () => {
    it('should return default state', () => {
      const { initialState } = fromReducer;
      const action = { type: 'Unknown' };
      const state = fromReducer.splashVideoReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('finish action', () => {
    it('should return state with done: true', () => {
      const { initialState } = fromReducer;
      const newState: SplashVideoState = { done: true };
      const action = fromActions.finish();
      const state = fromReducer.splashVideoReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('reset action', () => {
    it('should return state with done: false', () => {
      const { initialState } = fromReducer;
      const newState: SplashVideoState = { done: false };
      const action = fromActions.reset();
      const state = fromReducer.splashVideoReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
