import { Store } from '@ngrx/store';

import { GifsState } from 'src/app/models/gifs-state.model';
import * as gifsActions from './gifs.actions';

describe('Gifs Actions', () => {
  const gifsData = {
    home: [],
    'view-base': [
      {
        gifFilename: 'view-base-01.gif',
        thumbnailFilename: 'view-base-01.png',
        hoverMessagePaused: 'Click Play to start draw',
        hoverMessagePlaying: 'Click Stop to stop draw',
      },
      {
        gifFilename: 'view-base-02.gif',
        thumbnailFilename: 'view-base-02.png',
        hoverMessagePaused: 'Click Play to start rotation',
        hoverMessagePlaying: 'Click Stop to stop rotation',
      },
    ],
  };

  it('should return actions', () => {
    expect(gifsActions.loadGifs().type).toBe('[Gifs] Load Gifs');
    expect(gifsActions.loadGifsSuccess({ gifs: gifsData }).type).toBe(
      '[Gifs] Load Gifs Success',
    );
    expect(gifsActions.loadGifsFailure({ error: 'error' }).type).toBe(
      '[Gifs] Load Gifs Failure',
    );
  });

  describe('loadGifs', () => {
    it('should dispatch loadGifs action', () => {
      const expectedAction = gifsActions.loadGifs();
      const store = jasmine.createSpyObj<Store<GifsState>>('store', [
        'dispatch',
      ]);

      store.dispatch(gifsActions.loadGifs());

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('loadGifsSuccess', () => {
    it('should dispatch loadGifsSuccess action', () => {
      const expectedAction = gifsActions.loadGifsSuccess({
        gifs: gifsData,
      });
      const store = jasmine.createSpyObj<Store<GifsState>>('store', [
        'dispatch',
      ]);

      store.dispatch(gifsActions.loadGifsSuccess({ gifs: gifsData }));

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('loadGifsFailure', () => {
    it('should dispatch loadGifsFailure action', () => {
      const expectedAction = gifsActions.loadGifsFailure({ error: 'error' });
      const store = jasmine.createSpyObj<Store<GifsState>>('store', [
        'dispatch',
      ]);

      store.dispatch(gifsActions.loadGifsFailure({ error: 'error' }));

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
