import { Store } from '@ngrx/store';
import { FiguresState } from 'src/app/models/figures-state.model';
import * as figsActions from './figures.actions';

describe('figuresActions', () => {
  const figuresData = {
    home: [],
    view2: [],
  };

  it('should return actions', () => {
    expect(figsActions.loadFigures().type).toBe('[Figures] Load Figures');
    expect(figsActions.loadFiguresSuccess({ figures: figuresData }).type).toBe(
      '[Figures] Load Figures Success',
    );
    expect(figsActions.loadFiguresFailure({ error: 'error' }).type).toBe(
      '[Figures] Load Figures Failure',
    );
  });

  describe('loadFigures', () => {
    it('should dispatch loadFigures action', () => {
      const expectedAction = figsActions.loadFigures();
      const store = jasmine.createSpyObj<Store<FiguresState>>('store', [
        'dispatch',
      ]);

      store.dispatch(figsActions.loadFigures());

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('loadFiguresSuccess', () => {
    it('should dispatch loadFiguresSuccess action', () => {
      const expectedAction = figsActions.loadFiguresSuccess({
        figures: figuresData,
      });
      const store = jasmine.createSpyObj<Store<FiguresState>>('store', [
        'dispatch',
      ]);

      store.dispatch(figsActions.loadFiguresSuccess({ figures: figuresData }));

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('loadFiguresFailure', () => {
    it('should dispatch loadFiguresFailure action', () => {
      const expectedAction = figsActions.loadFiguresFailure({ error: 'error' });
      const store = jasmine.createSpyObj<Store<FiguresState>>('store', [
        'dispatch',
      ]);

      store.dispatch(figsActions.loadFiguresFailure({ error: 'error' }));

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
