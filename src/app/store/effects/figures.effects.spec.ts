import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FiguresEffects } from './figures.effects';

describe('FiguresEffects', () => {
  let actions$: Observable<any>;
  let effects: FiguresEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FiguresEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FiguresEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
