import * as fromFigures from './figures.actions';

describe('loadFigures', () => {
  it('should return an action', () => {
    expect(fromFigures.loadFigures().type).toBe('[Figures] Load Figures');
  });
});
