import { Gif } from './gif.model';

// gifs data model.
export interface GifsState {
  [key: string]: Gif[];
}
