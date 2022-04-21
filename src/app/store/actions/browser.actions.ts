import { createAction, props } from '@ngrx/store';

export const changeBreakpoint = createAction(
  '[Browser] Change Breakpoint',
  props<{ breakpoint: string }>(),
);
