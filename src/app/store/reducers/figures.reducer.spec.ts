import { figuresReducer, initialState } from './figures.reducer';

describe('Figures Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = figuresReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
