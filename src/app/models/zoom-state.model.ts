import { Figure } from './figure.model';

export interface ZoomState {
  currentImageFilename: string;
  currentViewImagesSubdir: string;
  currentViewZoomableFigures: Figure[];
  isOpen: boolean;
}
