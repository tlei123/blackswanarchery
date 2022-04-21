import { Store } from '@ngrx/store';

import * as svActions from './splash-video.actions';
import { SplashVideoState } from './../../models/splash-video-state.model';
import { Action } from 'rxjs/internal/scheduler/Action';

describe('Splash Video Actions', () => {
  describe('finish', () => {
    it('should dispatch Finish action', () => {
      const expectedAction = svActions.finish();
      const store = jasmine.createSpyObj<Store<SplashVideoState>>('store', [
        'dispatch',
      ]);

      store.dispatch(svActions.finish());

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('reset', () => {
    it('should dispatch Reset action', () => {
      const expectedAction = svActions.reset();
      const store = jasmine.createSpyObj<Store<SplashVideoState>>('store', [
        'dispatch',
      ]);

      store.dispatch(svActions.reset());

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
