import { createReducer, on } from '@ngrx/store';

import { ZoomState } from 'src/app/models/zoom-state.model';
import * as zoomActions from '../actions/zoom.actions';

export const initialState: ZoomState = {
  currentImageFilename: '',
  currentViewImagesSubdir: '',
  currentViewZoomableFigures: [],
  isOpen: false,
  zoomBreakpoints: ['md', 'lg', 'xl'],
};

export const zoomReducer = createReducer(
  initialState,
  on(zoomActions.openZoom, (state: ZoomState, { zoomData }) => ({
    ...state,
    ...zoomData,
    isOpen: true,
  })),
);
