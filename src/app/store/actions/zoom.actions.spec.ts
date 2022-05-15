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

  describe('setZoomableViewFigures', () => {
    it('should dispatch setZoomableViewFigures action', () => {
      const expectedAction = zActions.setZoomableViewFigures({
        zoomableViewFigures: [],
      });
      const store = jasmine.createSpyObj<Store<ZoomState>>('store', [
        'dispatch',
      ]);

      store.dispatch(
        zActions.setZoomableViewFigures({ zoomableViewFigures: [] }),
      );

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
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

  describe('changeZoom', () => {
    it('should dispatch changeZoom action', () => {
      const expectedAction = zActions.changeZoom({ imageFilename: 'test' });
      const store = jasmine.createSpyObj<Store<ZoomState>>('store', [
        'dispatch',
      ]);

      store.dispatch(zActions.changeZoom({ imageFilename: 'test' }));

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
