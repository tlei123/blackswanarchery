import { createFeatureSelector } from '@ngrx/store';

import { ZoomState } from './../../models/zoom-state.model';

export const selectZoomState = createFeatureSelector<ZoomState>('zoom');
