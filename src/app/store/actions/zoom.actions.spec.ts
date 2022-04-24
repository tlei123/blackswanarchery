import { Store } from '@ngrx/store';

import { ZoomState } from './../../models/zoom-state.model';
import * as zActions from './zoom.actions';

describe('Zoom Actions', () => {
  const zoomData = {
    currentImageFilename: '',
    currentViewImagesSubdir: '',
    currentViewZoomableFigures: [],
    isOpen: false,
  };

  it('should return actions', () => {
    expect(zActions.openZoom({ zoomData }).type).toBe('[Zoom] Open');
    expect(zActions.closeZoom().type).toBe('[Zoom] Close');
  });

  describe('openZoom', () => {
    it('should dispatch openZoom action', () => {
      const expectedAction = zActions.openZoom({ zoomData });
      const store = jasmine.createSpyObj<Store<ZoomState>>('store', [
        'dispatch',
      ]);

      store.dispatch(zActions.openZoom({ zoomData }));

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('closeZoom', () => {
    it('should dispatch closeZoom action', () => {
      const expectedAction = zActions.closeZoom();
      const store = jasmine.createSpyObj<Store<ZoomState>>('store', [
        'dispatch',
      ]);

      store.dispatch(zActions.closeZoom());

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
