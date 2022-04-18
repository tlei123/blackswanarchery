import { Figure } from './figure.model';

// figures data model.
export interface FiguresState {
  home: Figure[];
  'view-base': Figure[];
  view2: Figure[];
}
