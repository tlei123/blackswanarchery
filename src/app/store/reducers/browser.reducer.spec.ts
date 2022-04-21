import * as fromReducer from './browser.reducer';
import * as fromActions from '../actions/browser.actions';
import { BrowserState } from './../../models/browser-state.model';

describe('Browser Reducer', () => {
  describe('unknown action', () => {
    it('should return previous state', () => {
      const { initialState } = fromReducer;
      const action = { type: 'Unknown' };
      const state = fromReducer.browserReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('changeBreakpoint action', () => {
    it('should return state with currentBreakpoint: "xl"', () => {
      const { initialState } = fromReducer;
      const newState: BrowserState = { currentBreakpoint: 'xl' };
      const action = fromActions.changeBreakpoint({ breakpoint: 'xl' });
      const state = fromReducer.browserReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
