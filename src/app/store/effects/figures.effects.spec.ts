import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';

import { FiguresEffects } from './figures.effects';
import { FiguresService } from './../../services/figures.service';

describe('FiguresEffects', () => {
  let actions$: Observable<any>;
  let effects: FiguresEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FiguresEffects,
        provideMockActions(() => actions$),
        FiguresService,
      ],
    });

    effects = TestBed.inject(FiguresEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
