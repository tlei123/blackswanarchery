import * as fromFigures from './figures.actions';

describe('loadFiguress', () => {
  it('should return an action', () => {
    expect(fromFigures.loadFiguress().type).toBe('[Figures] Load Figuress');
  });
});
