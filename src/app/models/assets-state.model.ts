import { Figure } from './figure.model';
import { Gif } from './gif.model';

export interface FiguresState {
  [view: string]: Figure[];
}

export interface GifsState {
  [view: string]: Gif[];
}

export interface AssetsState {
  figures: FiguresState;
  gifs: GifsState;
}
