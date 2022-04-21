import { Store } from '@ngrx/store';

import { BrowserState } from 'src/app/models/browser-state.model';
import * as browserActions from './browser.actions';

describe('Browser Actions', () => {
  const figuresData = {
    home: [],
    view2: [],
  };

  it('should return actions', () => {
    expect(browserActions.changeBreakpoint({ breakpoint: 'xs' }).type).toBe(
      '[Browser] Change Breakpoint',
    );
  });

  describe('changeBreakpoint', () => {
    it('should dispatch changeBreakpoint action', () => {
      const expectedAction = browserActions.changeBreakpoint({
        breakpoint: 'xl',
      });
      const store = jasmine.createSpyObj<Store<BrowserState>>('store', [
        'dispatch',
      ]);

      store.dispatch(
        browserActions.changeBreakpoint({
          breakpoint: 'xl',
        }),
      );

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
