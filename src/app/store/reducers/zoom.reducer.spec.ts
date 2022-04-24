import { zoomReducer, initialState } from './zoom.reducer';
import * as zActions from './../actions/zoom.actions';
import * as figsJson from './../../../data/figures.json';

describe('Zoom Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = zoomReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('openZoom action', () => {
    it('should return state with open: true', () => {
      const zoomData = {
        currentImageFilename: 'home',
        currentViewImagesSubdir: 'home',
        currentViewZoomableFigures: figsJson.home,
      };
      const action = zActions.openZoom({ zoomData });
      const state = zoomReducer(initialState, action);
      const newState = { ...zoomData, isOpen: true };

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
      expect(state.isOpen).toBeTrue();
    });
  });

  describe('closeZoom action', () => {
    it('should return closed state', () => {
      const openInitialState = { ...initialState, isOpen: true };
      const action = zActions.closeZoom();
      const state = zoomReducer(openInitialState, action);
    });
  });
});
