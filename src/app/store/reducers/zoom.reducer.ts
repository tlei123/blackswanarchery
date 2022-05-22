import { createReducer, on } from '@ngrx/store';

import { ZoomState } from 'src/app/models/zoom-state.model';
import * as zoomActions from '../actions/zoom.actions';

export const initialState: ZoomState = {
  currentZoomImageFilename: '',
  currentViewImagesSubdir: '',
  currentViewZoomableFigures: [],
  isOpen: false,
  zoomBreakpoints: ['md', 'lg', 'xl'],
};

export const zoomReducer = createReducer(
  initialState,
  on(
    zoomActions.setZoomableViewFigures,
    (state: ZoomState, { zoomableViewFigures }) => ({
      ...state,
      currentViewZoomableFigures: zoomableViewFigures,
    }),
  ),
  on(zoomActions.openZoom, (state: ZoomState, { zoomData }) => ({
    ...state,
    ...zoomData,
    isOpen: true,
  })),
  on(zoomActions.changeZoom, (state: ZoomState, { zoomImageFilename }) => ({
    ...state,
    currentZoomImageFilename: zoomImageFilename,
  })),
  on(zoomActions.closeZoom, (state: ZoomState) => ({
    ...state,
    isOpen: false,
  })),
);
