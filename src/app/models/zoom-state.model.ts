import { Figure } from './figure.model';

export interface ZoomState {
  currentZoomImageFilename: string;
  currentViewImagesSubdir: string;
  currentViewZoomableFigures: Figure[];
  isOpen: boolean;
  zoomBreakpoints: string[];
}
