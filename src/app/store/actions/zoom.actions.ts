import { createAction, props } from '@ngrx/store';

import { Figure } from 'src/app/models/figure.model';

export const setZoomableViewFigures = createAction(
  '[Zoom] Set zoomable view-figures',
  props<{ zoomableViewFigures: Figure[] }>(),
);

export const openZoom = createAction(
  '[Zoom] Open',
  props<{
    zoomData: any;
  }>(),
);

export const changeZoom = createAction(
  '[Zoom] Next',
  props<{
    imageFilename: string;
  }>(),
);

export const closeZoom = createAction('[Zoom] Close');
