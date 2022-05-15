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

  describe('setZoomableViewFigures action', () => {
    it('should return state with updated currentViewZoomableFigures', () => {
      const mockZoomableFigures = [
        {
          imageFilename: 'test1.jpg',
          imageFilename2x: '',
          caption: 'test1 caption',
          zoomable: true,
        },
        {
          imageFilename: 'test2.jpg',
          imageFilename2x: '',
          caption: 'test2 caption',
          zoomable: true,
        },
      ];
      const action = zActions.setZoomableViewFigures({
        zoomableViewFigures: mockZoomableFigures,
      });
      const state = zoomReducer(initialState, action);
      const newState = {
        ...initialState,
        currentViewZoomableFigures: mockZoomableFigures,
      };

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
      expect(state.currentViewZoomableFigures).not.toEqual(
        initialState.currentViewZoomableFigures,
      );
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
      const newState = { ...initialState, ...zoomData, isOpen: true };

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
      expect(initialState.isOpen).toBeFalse();
      expect(state.isOpen).toBeTrue();
    });
  });

  describe('changeZoom action', () => {
    it('should return state with updated currentImageFilename', () => {
      const openInitialState = { ...initialState, isOpen: true };
      const mockFilename = 'test1.jpg';
      const action = zActions.changeZoom({ imageFilename: mockFilename });
      const state = zoomReducer(openInitialState, action);
      const newState = {
        ...openInitialState,
        currentImageFilename: mockFilename,
      };

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
      expect(state.currentImageFilename).not.toEqual(
        openInitialState.currentImageFilename,
      );
    });
  });

  describe('closeZoom action', () => {
    it('should return closed state', () => {
      const openInitialState = { ...initialState, isOpen: true };
      const action = zActions.closeZoom();
      const state = zoomReducer(openInitialState, action);
      const newState = { ...initialState, isOpen: false };

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
      expect(openInitialState.isOpen).toBeTrue();
      expect(state.isOpen).toBeFalse();
    });
  });
});
